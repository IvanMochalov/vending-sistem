import styles from './productItem.module.css'
interface IProductProps {
  readonly key: string;
  productId: string;
  userId: string;
  productName: string;
  deviceId: string;
  count: string;
  price: string;
}

export const ProductItem = ({ productName, price, count }: IProductProps) => {
  return (
    <li className={styles.productList__item}>
      <h4 className={styles.product__name}>{productName}</h4>
      <div className={styles.product__numbers}>
        <span className={styles.product__price}>Цена: {price}</span>
        <span className={styles.product__count}>Остаток: {count}</span>
      </div>
    </li>
  )
}

