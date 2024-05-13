import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Product } from './types';
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
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => axios.get<T>(url, config).then(responseBody),
  post: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => axios.post<T>(url, config).then(responseBody),
  put: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => axios.put<T>(url, config).then(responseBody),
};

const products = {
  getProducts: () => request.get<Product[]>('/products'),
  getProduct: (id: string) => request.get<Product>(`/products/${id}`),
  validateProductName: () => request.post<void>('/validate'),
  updateProduct: (id: string) => request.put<Product>(`/products/${id}`),
  addProduct: (product: Product) => request.post<Product>('/products', { data: product }),
};

export const api = { products };
