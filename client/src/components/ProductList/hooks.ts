import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { getUniqueProductCategoryData } from "./utils";
import { useEffect, useMemo, useState } from "react";
import { ProductCategoryData, ProductUpdateSuccess, SetProductUpdateSuccess } from "./types";
import { useModalContext } from "../../context/ModalContext";

export const useProducts = (): {
  products: Product[] | undefined;
  isLoading: boolean;
  error: Error | null;
  productCategoryData?: ProductCategoryData;
  setProductUpdateSuccess: SetProductUpdateSuccess;
  productUpdateSuccess: ProductUpdateSuccess
  handleCreateProduct: () => void;
} => {
  const { data: products, isFetching, isLoading, error, refetch, isFetched } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.getProducts(),
  });

  const [productUpdateSuccess, setProductUpdateSuccess] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (productUpdateSuccess) refetch();

    const timer1 = setTimeout(() => setProductUpdateSuccess(null), 5 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [productUpdateSuccess]);

  // Even though we depend on products, this list should persist so we have all options available
  // as server options are updated and overwritten. Ideally the server returns all options or config
  // for the client to use. Create category data once data is fetched
  const productCategoryData = useMemo(() => {
    if (isFetched) return getUniqueProductCategoryData(products || []);
  }, [isFetched]);

  const { setNewProduct } = useModalContext();

  const handleCreateProduct = async () => {
    setNewProduct(true);
  };

  const productsNewestFirst = useMemo(() => Array.from(products || []).reverse(), [products]);

  return {
    products: products ? productsNewestFirst : undefined,
    isLoading: isLoading || isFetching,
    error,
    productCategoryData,
    setProductUpdateSuccess,
    productUpdateSuccess,
    handleCreateProduct
  };
};
