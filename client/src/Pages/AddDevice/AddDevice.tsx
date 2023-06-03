import { useEffect, useRef, useState } from 'react'
import styles from './addDevice.module.css'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { useAddDeviceMutation } from '../../app/services/device'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Device } from '@prisma/client'
import { TShippingFiledAddDevice } from '../../types'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/ErrorMessage'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'

export const AddDevice = () => {
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [addDevice] = useAddDeviceMutation()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [navigate, user])

	const ref = useRef<HTMLFormElement>(null)
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

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
		reset,
		setFocus,
	} = useForm<TShippingFiledAddDevice>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<TShippingFiledAddDevice> = async (
		data: Device
	) => {
		try {
			await addDevice(data).unwrap()
			reset()
			navigate('/status/created', { replace: true })
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setError(err.data.message)
			} else {
				setError('Неизвестная ошибка')
			}
		}
	}

	useEffect(() => {
		setFocus('modelName')
	}, [setFocus])

	const node = document.querySelector('#modal_root')
	if (!node) return null
	return createPortal(
		<div className={styles.modal}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form} ref={ref}>
				<button
					className={styles.form__cancel}
					type='button'
					onClick={() => {
						navigate('/devices', { replace: true })
					}}
				>
					<Icon
						name={EIcons.cancel}
						size={28}
						className={styles.form__cancel_icon}
					/>
				</button>
				<h2 className={styles.form__title}>Добавление аппарата</h2>
				<div className={styles.form__group}>
					<input
						{...register('modelName', {
							required: 'Model name is require field',
							maxLength: {
								value: 20,
								message: "Maximum 20 letter's",
							},
							minLength: {
								value: 3,
								message: "Minimum 3 letter's",
							},
						})}
						aria-invalid={errors.modelName?.message ? 'true' : undefined}
						type='text'
						placeholder=' '
						className={styles.form__input}
					/>
					{errors?.modelName && (
						<Icon name={EIcons.no} size={20} className={styles.input__no} />
					)}
					{!errors.modelName?.message && dirtyFields.modelName && (
						<Icon name={EIcons.ok} size={20} className={styles.input__ok} />
					)}
					<label className={styles.form__label}>Модель</label>
					{errors?.modelName && (
						<p className={styles.form__error}>{errors.modelName.message}</p>
					)}
				</div>
				<div className={styles.form__group}>
					<input
						{...register('location', {
							required: 'Location is require field',
							maxLength: {
								value: 20,
								message: "Maximum 20 letter's",
							},
							minLength: {
								value: 3,
								message: "Minimum 3 letter's",
							},
						})}
						aria-invalid={errors.location?.message ? 'true' : undefined}
						type='text'
						placeholder=' '
						className={styles.form__input}
					/>
					{errors?.location && (
						<Icon name={EIcons.no} size={20} className={styles.input__no} />
					)}
					{!errors.location?.message && dirtyFields.location && (
						<Icon name={EIcons.ok} size={20} className={styles.input__ok} />
					)}
					<label className={styles.form__label}>Местоположение</label>
					{errors?.location && (
						<p className={styles.form__error}>{errors.location.message}</p>
					)}
				</div>
				<button type='submit' className={styles.form__button}>
					Добавить
				</button>
				<ErrorMessage message={error} />
			</form>
		</div>,
		node
	)
}
