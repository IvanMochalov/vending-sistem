import { Product } from '@prisma/client'
import { useGetAllProductsQuery } from '../../app/services/product'
import styles from './productsList.module.css'
import { ProductItem } from '../ProductItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import { Link } from 'react-router-dom'

interface IProductsListProps {
	deviceId: string
}

export const ProductsList = ({ deviceId }: IProductsListProps) => {
	const { data, isLoading } = useGetAllProductsQuery(deviceId || '')
	const user = useSelector(selectUser)

	return (
		<>
			{isLoading && <div className={styles.loading}>{'Loading...'}</div>}
			<div className={styles.products__content}>
				{!isLoading && (
					<ul className={styles.products__list}>
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
						) : (data.length !== 0) ? (
							data.map(
								(product: Product) => (
									<ProductItem
										key={product.id}
										productId={product.id}
										productName={product.name}
										userId={product.userId}
										deviceId={product.deviceId}
										count={product.count}
										price={product.price}
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
				)}
			</div>
		</>
	)
}
