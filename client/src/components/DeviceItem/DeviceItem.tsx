import { Link } from 'react-router-dom'
import { convertData } from '../../utils/convertData';
import styles from './deviceItem.module.css';
import { Paths } from '../../path'

interface IDeviceProps {
  readonly key: string;
  deviceId: string;
  deviceName: string;
  userId: string;
  location: string;
  started: Date;
}

export const DeviceItem = ({
  deviceId,
  // userId
  deviceName,
  location,
  started,
}: IDeviceProps) => {
  return (
    <Link className={styles.device} to={`${Paths.devices}/${deviceId}`}>
      <h3 className={styles.device__name}>{deviceName}</h3>
      <p className={styles.device__description}>
        {`Started ${convertData(started)} in ${location}`}
      </p>
      {/* <div className={styles.device__id}>
        {deviceId}
      </div>
      <div className={styles.device__userId}>
        {userId}
      </div> */}
    </Link>
  )
}

