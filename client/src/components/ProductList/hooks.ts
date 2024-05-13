import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { getUniqueProductCategoryData } from "./utils";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ProductCategoryData } from "./types";

export const useProducts = (): {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  productCategoryData: ProductCategoryData;
  //editProdcutId: number | null;
  //setEditProductId: Dispatch<SetStateAction<number | null>>
} => {
  const { data: products, isFetching, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });

  const productCategoryData = useMemo(() => getUniqueProductCategoryData(products || []), [products]);

  //const [editProdcutId, setEditProductId] = useState<number | null>(null);

  return {
    products,
    isLoading: isLoading || isFetching,
    error,
    productCategoryData,
    //editProdcutId,
    //setEditProductId
  };
};
