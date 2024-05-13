import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { getProductTypes } from "./utils";
import { useMemo } from "react";

export const useProducts = (): {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  productTypes: string[];
} => {
  const { data: products, isFetching, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });


  const productTypes = useMemo(() => getProductTypes(products || []), [products]);

  return { products, isLoading: isLoading || isFetching, error, productTypes };
};
