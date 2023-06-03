import { Link, Outlet, useParams } from 'react-router-dom'
import { ProductsList } from '../../components/ProductsList'
import styles from './deviceStatistics.module.css'
import { useGetDeviceQuery } from '../../app/services/device'
import { convertData } from '../../utils/convertData'
import { useSelector } from 'react-redux'

import { selectUser } from '../../features/auth/authSlice'

export const DeviceStatistics = () => {
	const { device_id } = useParams<{ device_id: string }>()
	const { data, isLoading } = useGetDeviceQuery(device_id || '')
	const user = useSelector(selectUser)

	return (
		<>
			<div>
				{data && (
					<div className={styles.description__container}>
						<div className={styles.products__description}>
							{device_id && <ProductsList deviceId={device_id} />}
						</div>
						<div className={styles.device__management}>
							<div className={styles.device__description}>
								{isLoading && (
									<div className={styles.loading}>{'Loading...'}</div>
								)}
								<span className={styles.location__value}>{data.location}</span>
								{data.started !== null && (
									<p className={styles.started}>{`Started ${convertData(
										new Date(data.started)
									)} in ${data.location}`}</p>
								)}
							</div>
							{user?.id === data.userId && (
								<div className={styles.device__controller}>
									<Link
										to={`/devices/${device_id}/edit`}
										className={`${styles.controller__btn} ${styles.controller__edit}`}
									>
										Редактировать
									</Link>
									<Link
										to={`/devices/${device_id}/remove`}
										className={`${styles.controller__btn} ${styles.controller__remove}`}
									>
										Удалить
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<Outlet />
		</>
	)
}
