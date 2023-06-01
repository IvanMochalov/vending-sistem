import './main.global.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Home } from './Pages/Home';
import { Layout } from './components/Layout';
import { Paths } from './path';
import { Devices } from './Pages/Devices'
// import { StatisticsPage } from './Pages/StatisticsPage';
// import { NotFound } from './Pages/NotFound';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path={Paths.home} element={<Layout />}>
        <Route path={Paths.home} element={<Devices />} >
          <Route path={Paths.register} element={<Register />}  />
          <Route path={Paths.login} element={<Login />} />
        </Route>
        {/* <Route path='/statistics' element={<StatisticsPage />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App
