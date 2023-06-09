import { Link } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
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

export const ProductItem = ({ productName, price, count, deviceId, productId }: IProductProps) => {
  // const { device_id } = useParams<{ device_id: string }>()

  return (
    <li className={styles.productList__item}>
      <h4 className={styles.product__name}>{productName}</h4>
      <div className={styles.product__numbers}>
        <span className={`${styles.product__price} ${styles.numbers__item}`}>Цена: {price}</span>
        <span className={`${styles.product__count} ${styles.numbers__item}`}>Остаток: {count}</span>
        <Link to={`/devices/${deviceId}/products/${productId}/edit`} className={`${styles.numbers__item} ${styles.numbers__link}`}>
          <Icon name={EIcons.edit} size={20} className={`${styles.numbers__item} ${styles.product__icon} ${styles.edit__icon}`}/>
        </Link>
        <Link to={`/devices/${deviceId}/products/${productId}/remove`} className={`${styles.numbers__item} ${styles.numbers__link}`}>
          <Icon name={EIcons.delete} size={20} className={`${styles.numbers__item} ${styles.product__icon} ${styles.delete__icon}`}/>
        </Link>
      </div>
    </li>
  )
}

