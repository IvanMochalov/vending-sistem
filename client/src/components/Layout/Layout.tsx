import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import styles from './layout.module.css'
import { Header } from '../Header'
import { Content } from '../Content'
import { useEffect } from 'react'
import { useGetDeviceQuery } from '../../app/services/device'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { NotFound } from '../../Pages/NotFound'

export const Layout = () => {
	const { device_id, product_id } = useParams<{ device_id: string, product_id: string }>()
	const location = useLocation()
	const user = useSelector(selectUser)
	const { data } = useGetDeviceQuery(device_id || '')

	useEffect(() => {
		console.log('Location changed')
	}, [location])

	return (
		<div className={styles.container}>
			<Header />
			<Content>
				<nav className={styles.navigation}>
					{(location.pathname === `/devices/${device_id}` ||
						location.pathname === `/devices/${device_id}/remove` ||
						location.pathname === `/devices/${device_id}/edit` || 
						location.pathname === `/devices/${device_id}/products/add` ||
						location.pathname === `/devices/${device_id}/products/${product_id}/remove`
						) && data && (
						<>
							<p className={styles.title}>{data?.modelName}</p>
							<Link className={styles.title_little} to='/devices'>
								Мои аппараты
							</Link>
						</>
					)}
					{(location.pathname === `/devices/${device_id}` ||
						location.pathname === `/devices/${device_id}/remove` ||
						location.pathname === `/devices/${device_id}/edit`) && !data && (
						<NotFound />
					)}
					{(location.pathname === `/devices` ||
						location.pathname === `/devices/add`) && (
						<>
							<Link className={styles.title} to='/'>
								На главную
							</Link>
							<Link className={styles.add__device} to='/devices/add'>
								<Icon
									name={EIcons.add}
									size={18}
									className={styles.add__icon}
								/>
								Добавить аппарат
							</Link>
						</>
					)}
					{location.pathname === `/` && user && (
						<>
							<Link className={styles.title} to='/devices'>
								Мои аппараты
							</Link>
							<p className={styles.user__name}>{user?.name}</p>
						</>
					)}
					{location.pathname === `/` && !user && (
						<div className={styles.need__login}>
							<Icon
									name={EIcons.data_locked}
									size={60}
									className={styles.noData_icon}
								/>
								<Link to='/login' className={styles.noUser_text}>
									You need to log in
								</Link>
						</div>
					)}
				</nav>
				<Outlet />
			</Content>
		</div>
	)
}
