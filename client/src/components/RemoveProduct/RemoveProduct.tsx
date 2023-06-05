import { createPortal } from 'react-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import styles from './removeProduct.module.css'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../ErrorMessage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { TGetProductParams, useGetProductQuery, useRemoveProductMutation } from '../../app/services/product'

export const RemoveProduct = () => {
  const navigate = useNavigate()
	const [error, setError] = useState('')
	const [removeProduct] = useRemoveProductMutation()
	const { device_id, product_id } = useParams<TGetProductParams>()
	const { data, isLoading } = useGetProductQuery({ device_id, product_id } as TGetProductParams )

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

	const handleDeleteProduct = async () => {
		try {
			if (!data) {
				throw Error('data is missing')
			}
			await removeProduct({device_id: data.deviceId, product_id: data.id}).unwrap()

			navigate('/status/product_deleted', { replace: true })
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
						<p className={styles.title}>Удалить продукт?</p>
						<button
							className={styles.btn_delete}
							onClick={() => {
								handleDeleteProduct()
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

