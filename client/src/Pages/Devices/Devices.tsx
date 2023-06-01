import { Device } from '@prisma/client';
import { useGetAllDevicesQuery } from '../../app/services/device';
import styles from './devices.module.css';
import { DeviceItem } from '../../components/DeviceItem';
import { Icon } from '../../Icons';
import { EIcons } from '../../exports';
import { Link, Outlet } from 'react-router-dom';
import { Paths } from '../../path';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

export const Devices = () => {
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllDevicesQuery();

  return (
    <>
    <Outlet />
      {isLoading && (
        <div className={styles.loading}>{"Loading..."}</div>
      )}
      {!isLoading &&  (
        <>
          <h1 className={styles.title}>Ваши аппараты</h1>
          <ul className={styles.devicesList}>
            {!user ? (
               <>
               <Icon name={EIcons.data_locked} size={60} className={styles.noData_icon}/>
               <Link to={Paths.login} className={styles.noUser_text}>You need to log in</Link>
             </>
            ) : (
              !data ? (
                <>
                <Icon name={EIcons.no_data} size={60} className={styles.noData_icon}/>
                <span className={styles.noData_text}>Data is missing</span>
                </>
              ) : (
                data.map((device: Device) => (
                  device.started!==null &&
                  <DeviceItem
                    key={device.id}
                    deviceId={device.id}
                    deviceName={device.modelName}
                    userId={device.userId}
                    location={device.location}
                    started={new Date(device.started)}
                  />
              ))
              )
            )}
          </ul>
        </>
      )}
    </>
  )
}

