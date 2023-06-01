import { useParams } from 'react-router-dom'
import { ProductsList } from '../../components/ProductsList'
import styles from './deviceStatistics.module.css'
import { useGetDeviceQuery } from '../../app/services/device'

export const DeviceStatistics = () => {
  const { device_id } = useParams<{device_id: string }>();

  const { data } = useGetDeviceQuery(device_id || '');
  return (
    <div>
      I Device
      <div>
        {device_id && (
          <ProductsList deviceId={device_id} />
        )}
      </div>
    </div>
  )
}

