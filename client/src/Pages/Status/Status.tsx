import styles from './status.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { NotFound } from '../NotFound'

const Statuses: Record<string, string> = {
	created: 'Аппарат успешно добавлен',
	updated: 'Аппарат успешно обновлен',
	deleted: 'Аппарат успешно удален',
	product_created: 'Продукт успешно добавлен',
	product_updated: 'Продукт успешно обновлен',
	product_deleted: 'Продукт успешно удален',
}

export const Status = () => {
	const { status } = useParams()
	const navigate = useNavigate()
	return (
		<>
			{status ? (
				status && Statuses[status] !== undefined ? (
					<div className={styles.status}>
						<div className={styles.status__content}>
							<Icon
								name={EIcons.success}
								size={80}
								className={styles.status__icon}
							/>
							<p className={styles.status__title}>{Statuses[status]}</p>
							<button
								onClick={() => {
									{status === 'created' ||
									status === 'updated' ||
									status === 'deleted'
										? navigate('/devices', {replace: true})
										: navigate(-1)}
								}}
								className={styles.status__link}
							>
								{status === 'created' ||
								status === 'updated' ||
								status === 'deleted'
									? `К аппаратам`
									: `К продуктам`}
							</button>
						</div>
					</div>
				) : (
					<NotFound />
				)
			) : (
				<NotFound />
			)}
		</>
	)
}
