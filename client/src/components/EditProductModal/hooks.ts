import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";

export const useEditProduct = (productId: number | null): {
  product?: Product
  isLoading: boolean;
  error: Error | null;
} => {
  const { data: product, isFetching, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      if (productId) {
        return api.products.getProduct(productId);
      }
    },
    enabled: !!productId,
  });
  return { product, isLoading: isLoading || isFetching, error };
};
