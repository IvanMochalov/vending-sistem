import { Device } from '@prisma/client'
import { useGetAllDevicesQuery } from '../../app/services/device'
import { DeviceItem } from '../../components/DeviceItem'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import styles from './devices.module.css'

export const Devices = () => {
	const user = useSelector(selectUser)
	const location = useLocation()
	const { data, isLoading } = useGetAllDevicesQuery()
	useEffect(() => {
		console.log('Location changed')
	}, [location, data])

	return (
		<>
			<Outlet />
			{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
			{!isLoading && (
				<>
					<ul className={styles.devicesList}>
						{!user ? (
							<>
								<Icon
									name={EIcons.data_locked}
									size={60}
									className={styles.noData_icon}
								/>
								<Link to='/login' className={styles.noUser_text}>
									You need to log in
								</Link>
							</>
						) : !data  ? (
							<>
								<Icon
									name={EIcons.no_data}
									size={60}
									className={styles.noData_icon}
								/>
								<span className={styles.noData_text}>Data is missing</span>
							</>
						) : (
							data.map(
								(device: Device) =>
									device.started !== null && (
										<DeviceItem
											key={device.id}
											deviceId={device.id}
											deviceName={device.modelName}
											userId={device.userId}
											location={device.location}
											started={new Date(device.started)}
										/>
									)
							)
						)}
					</ul>
				</>
			)}
		</>
	)
}
