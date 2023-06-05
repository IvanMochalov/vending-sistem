import './main.global.css'
import { Routes, Route } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import { Layout } from './components/Layout'
import { Devices } from './Pages/Devices'
import { DeviceStatistics } from './Pages/DeviceStatistics/DeviceStatistics'
import { RemoveDevice } from './components/RemoveDevice'
import { AddDevice } from './Pages/AddDevice'
import { Status } from './Pages/Status'
import { NotFound } from './Pages/NotFound'
import { EditDevice } from './Pages/EditDevice/EditDevice'
import { AddProduct } from './Pages/AddProduct'
import { RemoveProduct } from './components/RemoveProduct'
import { EditProduct } from './Pages/EditProduct'

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/status/:status' element={<Status />} />
				<Route path='/devices' element={<Devices />}>
					<Route path='/devices/add' element={<AddDevice />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path={`/devices/:device_id`} element={<DeviceStatistics />}>
					<Route path={`/devices/:device_id/edit`} element={<EditDevice />} />
					<Route
						path={`/devices/:device_id/remove`}
						element={<RemoveDevice />}
					/>
					<Route path='/devices/:device_id/products/:product_id/remove' element={<RemoveProduct />} />
					<Route path='/devices/:device_id/products/:product_id/edit' element={<EditProduct />} />
					<Route path='/devices/:device_id/products/add' element={<AddProduct />} />
				</Route>
				{/* </Route> */}
				{/* <Route path='/statistics' element={<StatisticsPage />} /> */}
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
