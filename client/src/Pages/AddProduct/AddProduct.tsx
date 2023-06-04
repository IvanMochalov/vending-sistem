import { useEffect, useRef, useState } from 'react'
import styles from './addProduct.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddProductMutation } from '../../app/services/product'
import { TShippingFiledAddProduct } from '../../types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Product } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { createPortal } from 'react-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { ErrorMessage } from '../../components/ErrorMessage'

export const AddProduct = () => {
  const [error, setError] = useState('')
  const { device_id } = useParams<{ device_id: string }>()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [addProduct] = useAddProductMutation()

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
	} = useForm<TShippingFiledAddProduct>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<TShippingFiledAddProduct> = async (
		dataForm: Product
	) => {
		try {
      if (!device_id) {
        throw Error('no device_id')
      }
      const newProduct = {
        ...dataForm,
        deviceId: device_id
      }
			await addProduct(newProduct).unwrap()
			reset()
			navigate('/status/product_created', { replace: true })
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
		setFocus('name')
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
						navigate(-1)
					}}
				>
					<Icon
						name={EIcons.cancel}
						size={28}
						className={styles.form__cancel_icon}
					/>
				</button>
				<h2 className={styles.form__title}>Добавление продукта</h2>
				<div className={styles.form__group}>
					<input
						{...register('name', {
							required: 'Name is require field',
							maxLength: {
								value: 20,
								message: "Maximum 20 letter's",
							},
							minLength: {
								value: 3,
								message: "Minimum 3 letter's",
							},
						})}
						aria-invalid={errors.name?.message ? 'true' : undefined}
						type='text'
						placeholder=' '
						className={styles.form__input}
					/>
					{errors?.name && (
						<Icon name={EIcons.no} size={20} className={styles.input__no} />
					)}
					{!errors.name?.message && dirtyFields.name && (
						<Icon name={EIcons.ok} size={20} className={styles.input__ok} />
					)}
					<label className={styles.form__label}>Название</label>
					{errors?.name && (
						<p className={styles.form__error}>{errors.name.message}</p>
					)}
				</div>
				<div className={styles.form__group}>
					<input
						{...register('price', {
							required: 'Price is require field',
							minLength: {
								value: 1,
								message: "Minimum 1 figure",
							},
						})}
						aria-invalid={errors.price?.message ? 'true' : undefined}
						type='text'
						placeholder=' '
						className={styles.form__input}
					/>
					{errors?.price && (
						<Icon name={EIcons.no} size={20} className={styles.input__no} />
					)}
					{!errors.price?.message && dirtyFields.price && (
						<Icon name={EIcons.ok} size={20} className={styles.input__ok} />
					)}
					<label className={styles.form__label}>Цена</label>
					{errors?.price && (
						<p className={styles.form__error}>{errors.price.message}</p>
					)}
				</div>
				<div className={styles.form__group}>
					<input
						{...register('count', {
							required: 'Count is require field',
							minLength: {
								value: 1,
								message: "Minimum 1 figure",
							},
						})}
						aria-invalid={errors.count?.message ? 'true' : undefined}
						type='text'
						placeholder=' '
						className={styles.form__input}
					/>
					{errors?.count && (
						<Icon name={EIcons.no} size={20} className={styles.input__no} />
					)}
					{!errors.count?.message && dirtyFields.count && (
						<Icon name={EIcons.ok} size={20} className={styles.input__ok} />
					)}
					<label className={styles.form__label}>Количество</label>
					{errors?.count && (
						<p className={styles.form__error}>{errors.count.message}</p>
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

