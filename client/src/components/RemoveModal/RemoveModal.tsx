import styles from './removeModal.module.css'
import { EIcons } from '../../exports'
import { Icon } from '../../Icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useGetDeviceQuery,
	useRemoveDeviceMutation,
} from '../../app/services/device'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { createPortal } from 'react-dom'
import { ErrorMessage } from '../ErrorMessage'

export const RemoveModal = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [removeDevice] = useRemoveDeviceMutation()
	const { device_id } = useParams<{ device_id: string }>()
	const { data, isLoading } = useGetDeviceQuery(device_id || '')

	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				event.target instanceof Node &&
				!ref.current?.contains(event.target)
			) {
				navigate(-1)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	const handleDeleteDevice = async () => {
		try {
			if (!data) {
				throw Error('data is missing')
			}
			await removeDevice(data.id).unwrap()

			navigate('/status/deleted', { replace: true })
		} catch (error) {
			const maybeError = isErrorWithMessage(error)

			if (maybeError) {
				setError(error.data.message)
			} else {
				setError('Неизвестная ошибка')
			}
		}
	}

	const node = document.querySelector('#modal_root')
	if (!node) return null

	return createPortal(
		<div className={styles.modal}>
			<div className={styles.content} ref={ref}>
				{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
				{!isLoading && (
					<>
						<button
							className={styles.form__cancel}
							type='button'
							onClick={() => {
								navigate(-1)
								console.log('закрыл')
							}}
						>
							<Icon
								name={EIcons.cancel}
								size={28}
								className={styles.form__cancel_icon}
							/>
						</button>
						<p className={styles.title}>Удалить аппарат?</p>
						<button
							className={styles.btn_delete}
							onClick={() => {
								handleDeleteDevice()
								console.log('want delete')
							}}
						>
							Удалить
						</button>
						<span
							className={styles.cancellation}
							onClick={() => {
								navigate(-1)
								console.log(`передумал`)
							}}
						>
							Отмена
						</span>
						<ErrorMessage message={error} />
					</>
				)}
			</div>
		</div>,
		node
	)
}
