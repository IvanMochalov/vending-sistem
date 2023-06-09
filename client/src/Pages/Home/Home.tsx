import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useGetAllDevicesQuery } from '../../app/services/device'
import { useEffect } from 'react'
import { MapHome } from '../../components/MapHome/MapHome'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
	const { data, isLoading } = useGetAllDevicesQuery()


  useEffect(() => {
		if (!user) {
			navigate('/', { replace: true })
		}
	}, [user, navigate])

  return (
    <>
			{!isLoading && data && (
        <MapHome />
        )}
    </>
  )
}

