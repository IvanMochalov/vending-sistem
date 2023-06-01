import style from './errorMessage.module.css';

type TErrorMessageProprs = {
  message?: string;
}

export const ErrorMessage = ({ message }: TErrorMessageProprs) => {
  if (!message) {
    return null
  }
  return (
    <div className={style.error_wrapper}>
      <span className={style.error_message}>{message}</span>
    </div>
  )
}
