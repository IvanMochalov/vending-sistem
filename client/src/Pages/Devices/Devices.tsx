import { Device } from '@prisma/client'
import { DeviceItem } from '../../components/DeviceItem'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { selectDevices } from '../../features/devices/devicesSlice'
import { useEffect } from 'react'
import styles from './devices.module.css'

export const Devices = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser)
	const {devices} = useSelector(selectDevices)

	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true })
		}
		if (!devices) {
			navigate('/', { replace: true })
		}
	}, [user, devices, navigate])

	return (
		<>
			<Outlet />
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
				) : !devices ? (
					<>
						<Icon
							name={EIcons.no_data}
							size={60}
							className={styles.noData_icon}
						/>
						<span className={styles.noData_text}>Data is missing</span>
					</>
				) : devices.length !== 0 ? (
					devices.map(
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
				) : (
					<>
						<Icon
							name={EIcons.no_data}
							size={60}
							className={styles.noData_icon}
						/>
						<span className={styles.emptyData_text}>Список пуст</span>
					</>
				)}
			</ul>
		</>
	)
}
