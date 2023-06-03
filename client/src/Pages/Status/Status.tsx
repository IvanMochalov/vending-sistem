import styles from './status.module.css'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { NotFound } from '../NotFound'

const Statuses: Record<string, string> = {
	created: 'Аппарат успешно добавлен',
	updated: 'Аппарат успешно обновлен',
	deleted: 'Аппарат успешно удален',
}

export const Status = () => {
	const { status } = useParams()
	return (
		<>
			{status ? ((status && (Statuses[status] !== undefined) ? (
				<div className={styles.status}>
					<div className={styles.status__content}>
						<Icon
							name={EIcons.success}
							size={80}
							className={styles.status__icon}
						/>
						<p className={styles.status__title}>{Statuses[status]}</p>
						<Link to='/devices' className={styles.status__link} replace>
							Мои аппараты
						</Link>
					</div>
				</div>
			) : (
				<NotFound />
			))
			) : (
				<NotFound />
			)}
		</>
	)
}
