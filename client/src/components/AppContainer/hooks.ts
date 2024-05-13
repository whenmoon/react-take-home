import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";

export const useProducts = (): {
  products: Product[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
  error: Error | null;
} => {
  const { data: products, isFetching, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });
  return { products, isFetching, isLoading, error };
};