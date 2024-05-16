import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Product, ProductWithoutId, ValidationRequestBody } from './types';
import { BASE_API_URL } from '../constants';

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <R>(url: string, config?: AxiosRequestConfig) =>
    axios.get<R, AxiosResponse<R>>(url, config).then(responseBody),
  post: <D, R>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.post<R, AxiosResponse<R>, D>(url, data, config).then(responseBody),
  put: <D, R>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axios.put<R, AxiosResponse<R>, D>(url, data, config).then(responseBody),
};

const products = {
  getProducts: () => request.get<Product[]>('/products'),
  getProduct: (id: number) => request.get<Product>(`/products/${id}`),
  validateProductName: (data: ValidationRequestBody) => request.post<ValidationRequestBody, void>('/validate', data),
  updateProduct: ({ id, ...rest }: Product) => request.put<ProductWithoutId, Product>(`/products/${id}`, { ...rest }),
  addProduct: (product: ProductWithoutId) => request.post<ProductWithoutId, Product>('/products', { ...product }),
};

export const api = { products };
