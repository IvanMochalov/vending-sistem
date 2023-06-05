import { Product } from '@prisma/client'
import { api } from './api'

export type TGetProductParams = {
	device_id: string
	product_id: string
}

export const productApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllProducts: builder.query<Product[], string>({
			query: device_id => ({
				url: `/devices/${device_id}/products`,
				method: 'GET',
			}),
		}),
		getProduct: builder.query<Product, TGetProductParams>({
			query: ({ device_id, product_id }) => ({
				url: `/devices/${device_id}/products/${product_id}`,
				method: 'GET',
			}),
		}),
		editProduct: builder.mutation<string, Product>({
			query: product => ({
				url: `/devices/${product.deviceId}/products/${product.id}/edit`,
				method: 'PUT',
				body: product,
			}),
		}),
		removeProduct: builder.mutation<string, TGetProductParams>({
			query: ({ device_id, product_id }) => ({
				url: `/devices/${device_id}/products/${product_id}/remove`,
				method: 'POST',
				body: { id: product_id, deviceId: device_id },
			}),
		}),
		addProduct: builder.mutation<Product, Product>({
			query: product => ({
				url: `/devices/${product.deviceId}/products/add`,
				method: 'POST',
				body: product,
			}),
		}),
	}),
})

export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useEditProductMutation,
	useRemoveProductMutation,
	useAddProductMutation,
} = productApi

export const {
	endpoints: {
		getAllProducts,
		getProduct,
		editProduct,
		removeProduct,
		addProduct,
	},
} = productApi
