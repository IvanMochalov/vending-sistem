import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TShippingFiledRegister } from '../../types';
import { useEffect, useState } from 'react';
import styles from './login.module.css';
import { Icon } from '../../Icons';
import { EIcons } from '../../exports';
import { UserData, useLoginMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { ErrorMessage } from '../../components/ErrorMessage';

export function Login() {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [ error, setError ] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, dirtyFields},
    reset,
    setFocus,
  } = useForm<TShippingFiledRegister>({
    mode: 'onChange',
  });
  
  const onSubmit: SubmitHandler<TShippingFiledRegister> = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      reset()
      navigate(Paths.home, {replace: true})
    } catch(err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }
  
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  
  const node = document.querySelector('#modal_root');
  if (!node) return null;
  
  return ReactDOM.createPortal(
		<div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <button className={styles.form__cancel} type="button" onClick={() => {navigate(Paths.home, {replace: true})}}>
          <Icon name={EIcons.cancel} size={28} className={styles.form__cancel_icon} />
        </button>
        <h2 className={styles.form__title}>Вход</h2>
        <div className={styles.form__group}>
          <input
            {...register('email',
              {
                required: 'Email is require field',
                pattern: {
                  value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: 'Please enter valid email'
                }
              })
            }
            aria-invalid={errors.email?.message ? "true" : undefined}
            type="email"
            placeholder=' '
            className={styles.form__input}
          />
          {errors?.email && (<Icon name={EIcons.no} size={20} className={styles.input__no}/>)}
          {!errors.email?.message && dirtyFields.email && (
          <Icon name={EIcons.ok} size={20} className={styles.input__ok}/>
          )}
          <label className={styles.form__label}>Email</label>
          {errors?.email && <p className={styles.form__error}>{errors.email.message}</p>}
        </div>
        <div className={styles.form__group}>
          <input
            {...register('password',
              {
                required: 'Password is require field',
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: 'Please enter valid password'
                }
              })
            }
            aria-invalid={errors.password?.message ? "true" : undefined}
            type="password"
            placeholder=' '
            className={styles.form__input}
          />
          {errors?.password && (<Icon name={EIcons.no} size={20} className={styles.input__no}/>)}
          {!errors.password?.message && dirtyFields.password && (
          <Icon name={EIcons.ok} size={20} className={styles.input__ok}/>
          )}
          <label className={styles.form__label}>Password</label>
          {errors?.password && <p className={styles.form__error}>{errors.password.message}</p>}
        </div>
        <button type="submit" className={styles.form__button}>Войти</button>
        <span className={styles.no_accaunt}>
          Нет аккаунта?
          <Link to={Paths.register} className={styles.link__register} replace>
            Зарегистрируйтесь
          </Link>
        </span>
        <ErrorMessage message={ error } />
      </form>
		</div>,
		node
  );
}


