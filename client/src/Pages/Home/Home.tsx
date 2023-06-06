import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useGetAllDevicesQuery } from '../../app/services/device'
import { useState } from 'react'
import styles from './home.module.css'

export const Home = () => {
  const user = useSelector(selectUser)
	const { data, isLoading } = useGetAllDevicesQuery()
  const [error, setError] = useState('')
  return (
    <div>
      
    </div>
  )
}

