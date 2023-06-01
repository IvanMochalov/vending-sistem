import { useGetAllProductsQuery } from '../../app/services/product';
import styles from './productsList.module.css';

interface IProductsListProps {
  deviceId: string;
}

export const ProductsList = ({ deviceId }: IProductsListProps ) => {
  const { data } = useGetAllProductsQuery(deviceId);
  console.log(data)
  return (
    <div>
      I products list
    </div>
  )
}

