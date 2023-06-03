import { Device } from '@prisma/client'
import { api } from './api'

export const deviceApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllDevices: builder.query<Device[], void>({
			query: () => ({
				url: '/devices',
				method: 'GET',
			}),
		}),
		getDevice: builder.query<Device, string>({
			query: device_id => ({
				url: `/devices/${device_id}`,
				method: 'GET',
			}),
		}),
		editDevice: builder.mutation<string, Device>({
			query: device => ({
				url: `/devices/${device.id}/edit`,
				method: 'PUT',
				body: device,
			}),
		}),
		removeDevice: builder.mutation<string, string>({
			query: device_id => ({
				url: `/devices/${device_id}/remove`,
				method: 'POST',
				body: { id: device_id },
			}),
		}),
		addDevice: builder.mutation<Device, Device>({
			query: device => ({
				url: `/devices/add`,
				method: 'POST',
				body: device,
			}),
		}),
	}),
})

export const {
	useGetAllDevicesQuery,
	useGetDeviceQuery,
	useEditDeviceMutation,
	useRemoveDeviceMutation,
	useAddDeviceMutation,
} = deviceApi

export const {
	endpoints: { getAllDevices, getDevice, editDevice, removeDevice, addDevice },
} = deviceApi
