import { Device } from '@prisma/client'
import { DeviceItem } from '../../components/DeviceItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { useGetAllDevicesQuery } from '../../app/services/device'
import styles from './devices.module.css'
import { NeedLogin } from '../../components/NeedLogin'
import { NoData } from '../../components/NoData'

export const Devices = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser)
	const { data, isLoading } = useGetAllDevicesQuery()

	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true })
		}
		if (!data) {
			navigate('/', { replace: true })
		}
	}, [user, data, navigate])

	return (
		<>
			<Outlet />
			{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
			{!isLoading && (
			<ul className={styles.devicesList}>
				{!user ? (
					<NeedLogin />
				) : !data ? (
					<NoData />
				) : data.length !== 0 ? (
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
				) : (
					<NoData text='Список пуст'/>
				)}
			</ul>
			)}
		</>
	)
}
