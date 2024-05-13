import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { getUniqueProductCategoryData } from "./utils";
import { useMemo } from "react";
import { ProductCategoryData } from "./types";

export const useProducts = (): {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  productCategoryData: ProductCategoryData;
} => {
  const { data: products, isFetching, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });


  const productCategoryData = useMemo(() => getUniqueProductCategoryData(products || []), [products]);

  return { products, isLoading: isLoading || isFetching, error, productCategoryData };
};
