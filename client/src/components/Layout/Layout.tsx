import { Outlet } from 'react-router-dom';
import styles from './layout.module.css'
import { Header } from '../Header'
import { Content } from '../Content'

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Content>
        <Outlet/>
      </Content>
    </div>
  )
}

