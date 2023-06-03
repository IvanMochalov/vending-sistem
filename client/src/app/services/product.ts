import { Product } from '@prisma/client';
import { api } from './api';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], string>({
      query: (device_id) => ({
        url: `/devices/products/${device_id}`,
        method: 'GET'
      })
    }),
    getProduct: builder.query<Product, {device_id: string, product_id:string}>({
      query: ({device_id, product_id}) => ({
        url: `/devices/products/${device_id}/${product_id}`,
        method: 'GET'
      })
    }),
    editProduct: builder.mutation<string, Product>({
      query: (product) => ({
        url: `/devices/products/${product.deviceId}/${product.id}/edit`,
        method: 'PUT'
      })
    }),
    removeProduct: builder.mutation<string, {device_id: string, product_id:string}>({
      query: ({device_id, product_id}) => ({
        url: `/devices/products/${device_id}/${product_id}/remove`,
        method: 'POST',
        body: { id: product_id, deviceId: device_id }
      })
    }),
    addProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `/devices/products/${product.deviceId}/add`,
        method: 'POST',
        body: product
      })
    }),
  })
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useEditProductMutation,
  useRemoveProductMutation,
  useAddProductMutation
} = productApi;

export const {
  endpoints: {
    getAllProducts,
    getProduct,
    editProduct,
    removeProduct,
    addProduct
  }
} = productApi;

