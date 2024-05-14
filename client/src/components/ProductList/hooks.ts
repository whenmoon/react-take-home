import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { getUniqueProductCategoryData } from "./utils";
import { useEffect, useMemo, useState } from "react";
import { ProductCategoryData, ProductUpdateSuccess, SetProductUpdateSuccess } from "./types";

export const useProducts = (): {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  productCategoryData: ProductCategoryData;
  setProductUpdateSuccess: SetProductUpdateSuccess;
  productUpdateSuccess: ProductUpdateSuccess
} => {
  const { data: products, isFetching, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });

  const [productUpdateSuccess, setProductUpdateSuccess] = useState<{ message: string } | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setProductUpdateSuccess(null), 5 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [productUpdateSuccess]);

  const productCategoryData = useMemo(() => getUniqueProductCategoryData(products || []), [products]);

  return {
    products,
    isLoading: isLoading || isFetching,
    error,
    productCategoryData,
    setProductUpdateSuccess,
    productUpdateSuccess,
  };
};
