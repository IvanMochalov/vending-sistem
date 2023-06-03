import { Product } from '@prisma/client'
import { useGetAllProductsQuery } from '../../app/services/product';
import styles from './productsList.module.css';
import { ProductItem } from '../ProductItem';

interface IProductsListProps {
  deviceId: string;
}

export const ProductsList = ({ deviceId }: IProductsListProps ) => {
  function isObjectEmpty(obj: object): boolean {
    return typeof obj === 'object' && Object.keys(obj).length === 0;
  }
  const { data, isLoading }  = useGetAllProductsQuery(deviceId || '');

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>{"Loading..."}</div>
      )}
      <ul className={styles.products__list}>
          {data && isObjectEmpty(data) && (
            <h3>Продукты отсутствуют</h3>
          )}
          {data && !(isObjectEmpty(data)) && (
              data.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  userId={product.userId}
                  deviceId={product.deviceId}
                  count={product.count}
                  price={product.price}
                />
              ))
            )
          }
      </ul>
    </>
  )
}

