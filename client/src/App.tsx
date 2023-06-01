import './main.global.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Layout } from './components/Layout';
import { Paths } from './path';
import { Devices } from './Pages/Devices'
import { DeviceStatistics } from './Pages/DeviceStatistics/DeviceStatistics'


const App: React.FC = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Layout />}>
        <Route path={Paths.devices} element={<Devices />} />
        <Route path={Paths.register} element={<Register />}  />
        <Route path={Paths.login} element={<Login />} />
        {/* </Route> */}
        <Route path={`${Paths.devices}/:device_id`} element={<DeviceStatistics />} />
        {/* <Route path='/statistics' element={<StatisticsPage />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App
