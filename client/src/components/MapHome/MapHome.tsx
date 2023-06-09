import { useState } from 'react'
import { Map, Placemark, Clusterer } from '@pbe/react-yandex-maps'
import styles from './mapHome.module.css'

export const MapHome = () => {
	// const [position, setPosition] = useState<[number, number]>([55.75, 37.57])
	// const [zoom, setZoom] = useState(4)
	// const mapState = useMemo(
	// 	() => ({ center: position, zoom, controls: [] }),
	// 	[zoom, position]
	// )
  const mapState = { center: [57.767918, 40.926894], zoom: 10, controls: [] };
	const cities = [
		{
			id: '1',
			data: { content: 'Saint-Petersburg' },
			options: { selectOnClick: false },
			coords: [59.93863, 30.31413],
		},
		{
			id: '2',
			data: { content: 'Kostroma' },
			options: { selectOnClick: false },
			coords: [57.767918, 40.926894],
		},
		{
			id: '3',
			data: { content: 'Moscow' },
			options: { selectOnClick: false },
			coords: [55.753559, 37.609218],
		},
	]

	const getPointData = (name: string) => {
		return {
			balloonContentBody: 'placemark <strong> ' + name + '</strong>',
			clusterCaption: 'placemark <strong>' + name + '</strong>',
		}
	}

	const getPointOptions = () => {
		return {
			preset: 'islands#violetIcon',
		}
	}

	const [state, setState] = useState<{zoom: number, center: number[]}>()

	const onItemClick = (coords: number[]) => {
		setState({ center: coords, zoom: 9 })
	}

	return (
		<div className={styles.home__map_container}>
			<div className={styles.home__map_wrapper}>
				<Map state={state} defaultState={mapState} width='100%' height='100%'>
					<Clusterer
						options={{
							preset: 'islands#invertedVioletClusterIcons',
							groupByCoordinates: false,
							clusterDisableClickZoom: true,
							clusterHideIconOnBalloonOpen: false,
							geoObjectHideIconOnBalloonOpen: false,
						}}
					>
						{cities.map(items => (
							<Placemark
								key={items.id}
								geometry={items.coords}
								properties={getPointData(items.data.content)}
								options={getPointOptions()}
							/>
						))}
					</Clusterer>
				</Map>
			</div>
			<ul className={styles.devicesList}>
				{cities.map(city => (
					<li key={city.id} className={styles.device}>
						<button onClick={() => onItemClick(city.coords)} className={styles.device_btn}>
							{city.data.content}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
