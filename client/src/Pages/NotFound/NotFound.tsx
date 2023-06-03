import { Link } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import styles from './notFound.module.css'

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <Icon name={EIcons.notFound} size={80} className={styles.notFound__icon}/>
        <h3 className={styles.notFound__title}>404 page not found</h3>
        <p className={styles.notFound__description}>We are sorry but the page you are looking for does not exist.</p>
        <Link to='/' className={styles.notFound__link} replace>
          На главную
        </Link>
      </div>
    </div>
  )
}

