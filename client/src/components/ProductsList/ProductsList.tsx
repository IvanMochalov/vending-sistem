import { Product } from '@prisma/client'
import { useGetAllProductsQuery } from '../../app/services/product'
import styles from './productsList.module.css'
import { ProductItem } from '../ProductItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { NoData } from '../NoData'
import { NeedLogin } from '../NeedLogin'

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
							<NeedLogin />
						) : !data  ? (
							<NoData />
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
							<NoData text='Список пуст'/>
						)}
					</ul>
				)}
			</div>
		</>
	)
}
