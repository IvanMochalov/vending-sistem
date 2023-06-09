import { Link } from 'react-router-dom'
import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import styles from './needLogin.module.css'

export const NeedLogin = () => {
  return (
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
  )
}

