import { useNavigate, useParams } from 'react-router-dom'
import styles from './editDevice.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
	useEditDeviceMutation,
	useGetDeviceQuery,
} from '../../app/services/device'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { createPortal } from 'react-dom'
import { TShippingFiledAddDevice } from '../../types'
import { useForm } from 'react-hook-form'
import { Device } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/ErrorMessage'

export const EditDevice = () => {
	const navigate = useNavigate()
	const { device_id } = useParams<{ device_id: string }>()
	const [error, setError] = useState('')
	const { data, isLoading } = useGetDeviceQuery(device_id || '')
	const [editDevice] = useEditDeviceMutation()

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
		defaultValues: useMemo(() => {
      return data;
    }, [data]),
	})

	useEffect(() => {
    reset(data);
  }, [data, reset]);

	async function onSubmit(dataForm: Device) {
		try {
			const editedDevice = {
				...data,
				...dataForm,
			}
			await editDevice(editedDevice).unwrap()
			reset()
			navigate('/status/updated', { replace: true })
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
				{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
				{!isLoading && (
					<>
						<button
							className={styles.form__cancel}
							type='button'
							onClick={() => {
								navigate(-1)
							}}
						>
							<Icon
								name={EIcons.cancel}
								size={28}
								className={styles.form__cancel_icon}
							/>
						</button>
						<h2 className={styles.form__title}>Редактирование аппарата</h2>
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
							Сохранить
						</button>
						<ErrorMessage message={error} />
					</>
				)}
			</form>
		</div>,
		node
	)
}
