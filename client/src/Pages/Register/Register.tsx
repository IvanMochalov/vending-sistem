import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TShippingFiledRegister } from '../../types';
import { useEffect } from 'react';
import styles from './register.module.css';

import { EIcons } from '../../exports'
import { Icon } from '../../Icons'

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, dirtyFields},
    reset,
    setFocus,
    watch,
  } = useForm<TShippingFiledRegister>({
    mode: 'onChange',
  });

  
  const onSubmit: SubmitHandler<TShippingFiledRegister> = (data) => {
    console.log(data)
    reset()
    navigate(Paths.devices, {replace: true})
  }
  
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const node = document.querySelector('#modal_root');
  if (!node) return null;
  
  return ReactDOM.createPortal(
		<div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <button className={styles.form__cancel} type="button" onClick={() => {navigate(Paths.home, {replace: true})}}>
          <Icon name={EIcons.cancel} size={28} className={styles.form__cancel_icon} />
        </button>
        <h2 className={styles.form__title}>Регистрация</h2>
        <div className={styles.form__group}>
          <input
            {...register('name',
              {
                required: 'Name is require field',
                minLength: {
                  value: 2,
                  message: "Minimum 2 letter's"
                },
                maxLength: {
                  value: 15,
                  message: "Maximum 15 letter's"
                },
              })
            }
            aria-invalid={errors.name?.message ? "true" : dirtyFields.name ? "false" : undefined}
            type="text"
            placeholder=' '
            className={styles.form__input}
          />
          {errors?.name && (<Icon name={EIcons.no} size={20} className={styles.input__no}/>)}
          {!errors.name?.message && dirtyFields.name && (
          <Icon name={EIcons.ok} size={20} className={styles.input__ok}/>
          )}
          <label className={styles.form__label}>Name</label>
          {errors?.name && <p className={styles.form__error}>{errors.name.message}</p>}
        </div>
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
            aria-invalid={errors.email?.message ? "true" : dirtyFields.email ? "false" : undefined}
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
            aria-invalid={errors.password?.message ? "true" : dirtyFields.password ? "false" : undefined}
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
        <div className={styles.form__group}>
          <input
            {...register('confirmPassword',
              {
                required: 'Password is require field',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Passwords don't match";
                  }
                }
              })
            }
            aria-invalid={errors.confirmPassword?.message ? "true" : dirtyFields.confirmPassword ? "false" : undefined}
            type="password"
            placeholder=' '
            className={styles.form__input}
          />
          {errors?.confirmPassword && (<Icon name={EIcons.no} size={20} className={styles.input__no}/>)}
          {!errors.confirmPassword?.message && dirtyFields.confirmPassword && (
          <Icon name={EIcons.ok} size={20} className={styles.input__ok}/>
          )}
          <label className={styles.form__label}>Repeat your password</label>
          {errors?.confirmPassword && <p className={styles.form__error}>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className={styles.form__button}>Войти</button>
        <span className={styles.has_account}>
          Есть аккаунт?
          <Link to={Paths.login} className={styles.link__login} replace>
            Войдите
          </Link>
        </span>
      </form>
		</div>,
		node
  );
}

