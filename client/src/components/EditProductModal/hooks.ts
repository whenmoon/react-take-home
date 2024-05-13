import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product } from "../../api/types";
import { UseFormRegister, UseFormWatch, useForm } from "react-hook-form";
import { ProductForm } from "./types";

export const useEditProduct = (productId: number | null): {
  product?: Product
  isLoading: boolean;
  error: Error | null;
  register: UseFormRegister<ProductForm>
  watch: UseFormWatch<ProductForm>
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

  const {
    register,
    //handleSubmit,
    watch,
    //formState,
  } = useForm<ProductForm>();


  return { product, isLoading: isLoading || isFetching, error, register, watch };
};
