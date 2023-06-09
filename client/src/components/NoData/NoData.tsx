import { Icon } from '../../Icons'
import { EIcons } from '../../exports'
import styles from './noData.module.css'

interface INoDataProps {
 text?: string;
}

export const NoData = ({ text }: INoDataProps) => {
  return (
    <div className={styles.noData}>
      <Icon
        name={EIcons.no_data}
        size={60}
        className={styles.noData__icon}
      />
      <span className={styles.noData__text}>{ text ? text : 'Data is missing'}</span>
    </div>
  )
}

