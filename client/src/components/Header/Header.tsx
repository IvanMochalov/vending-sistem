import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { Icon } from '../../Icons';
import { EIcons } from '../../exports';
import styles from './header.module.css';
import { logout, selectUser } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux'

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login)
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={Paths.home} className={styles.link__home}>
          <Icon name={EIcons.vend} size={40} className={styles.home__icon}/>
          VendFox
        </Link>
        {
          user ? (
            <div className={`${styles.link__auth} ${styles.btn}`} onClick={ onLogoutClick }>
              <Icon name={EIcons.exit} size={16} className={styles.exit__icon}/>
               <span className={styles.exit__text}>Выйти</span>
            </div>
          ) : (
            <div className={styles.auth}>
              <Link to={Paths.register} className={styles.link__auth} replace>
                <Icon name={EIcons.register} size={20} className={styles.auth__icon}/>
                Регистрация
              </Link>
              <Link to={Paths.login} className={styles.link__auth} replace>
                <Icon name={EIcons.login} size={16} className={styles.auth__icon}/>
                Вход
              </Link>
            </div>
          )
        }
      </div>
    </header>
  )
}