import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Product, ValidationRequestBody } from './types';
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
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axios.get<T>(url, config).then(responseBody),
  post: <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
    axios.post<T>(url, data, config).then(responseBody),
  put: <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
    axios.put<T>(url, data, config).then(responseBody),
};

const products = {
  getProducts: () => request.get<Product[]>('/products'),
  getProduct: (id: number) => request.get<Product>(`/products/${id}`),
  validateProductName: (data: ValidationRequestBody) => request.post<ValidationRequestBody>('/validate', data),
  updateProduct: ({ id, ...rest }: Product) => request.put<Omit<Product, 'id'>>(`/products/${id}`, { ...rest }),
  addProduct: (product: Product) => request.post<Product>('/products', { ...product }),
};

export const api = { products };
