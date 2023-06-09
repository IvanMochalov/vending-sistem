import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Auth } from './features/auth/auth'
import { YMaps } from '@pbe/react-yandex-maps'
import './main.global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth>
				<YMaps
          query={{
            ns: "use-load-option",
            load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            apikey: "8b9dd3de-6184-4dab-a8e4-2ab4d07e1362"
          }}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</YMaps>
			</Auth>
		</Provider>
	</React.StrictMode>
)
