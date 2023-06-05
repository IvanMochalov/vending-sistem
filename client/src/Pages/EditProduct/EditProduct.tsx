import { useNavigate, useParams } from 'react-router-dom'
import styles from './editProduct.module.css'
import { useEffect, useRef, useState } from 'react'
import {
	TGetProductParams,
	useEditProductMutation,
	useGetProductQuery,
} from '../../app/services/product'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TShippingFiledAddProduct } from '../../types'
import { Product } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { createPortal } from 'react-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { ErrorMessage } from '../../components/ErrorMessage'

export const EditProduct = () => {
	const navigate = useNavigate()
	const { device_id, product_id } = useParams<TGetProductParams>()
	const [error, setError] = useState('')
	const { data, isLoading } = useGetProductQuery({
		device_id,
		product_id,
	} as TGetProductParams)
	const [editProduct] = useEditProductMutation()

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
		defaultValues: {
			name: data?.name,
			count: data?.count,
			price: data?.price,
		},
	})

	const onSubmit: SubmitHandler<TShippingFiledAddProduct> = async (
		dataForm: Product
	) => {
		try {
			if (!device_id) {
				throw Error('no device_id')
			}
			const editedProduct = {
				...data,
				...dataForm,
			}
			await editProduct(editedProduct).unwrap()
			reset()
			navigate('/status/product_updated', { replace: true })
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
			{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
			{!isLoading && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}
					ref={ref}
				>
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
						<h2 className={styles.form__title}>Редактирование продукта</h2>
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
										message: 'Minimum 1 figure',
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
										message: 'Minimum 1 figure',
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
							<label className={styles.form__label}>Остаток</label>
							{errors?.count && (
								<p className={styles.form__error}>{errors.count.message}</p>
							)}
						</div>
						<button type='submit' className={styles.form__button}>
							Сохранить
						</button>
						<ErrorMessage message={error} />
					</>
				</form>
			)}
		</div>,
		node
	)
}
