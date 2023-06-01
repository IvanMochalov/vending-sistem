import { Link, Outlet, useParams } from 'react-router-dom';
import styles from './layout.module.css'
import { Header } from '../Header'
import { Content } from '../Content'
import { Paths } from '../../path'

export const Layout = () => {
  const { device_id } = useParams<{device_id: string }>();
  return (
    <div className={styles.container}>
      <Header />
      <Content>
        <Link className={styles.title} to={Paths.devices}>Мои аппараты</Link>
        <Outlet/>
      </Content>
    </div>
  )
}

