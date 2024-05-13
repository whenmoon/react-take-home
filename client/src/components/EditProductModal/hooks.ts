import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product, ValidationRequestBody } from "../../api/types";
import { Control, UseFormRegister, UseFormReset, UseFormWatch, useForm } from "react-hook-form";
import { ProductForm } from "./types";
import { useEffect, useRef } from "react";
import { throttle } from 'lodash';

export const useEditProduct = (productId: number | null): {
  product?: Product
  isLoading: boolean;
  error: Error | null;
  register: UseFormRegister<ProductForm>
  watch: UseFormWatch<ProductForm>
  nameValidationError: boolean | null;
  control: Control<ProductForm>
  resetForm: UseFormReset<ProductForm>
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
    control,
    reset
  } = useForm<ProductForm>();

  const currentProductName = watch('name');

  const mutation = useMutation({
    mutationFn: (data: ValidationRequestBody) => api.products.validateProductName(data),
  });

  const throttledMutation = throttle((data: ValidationRequestBody): void => {
    mutation.mutate(data);
  }, 500);

  const throttledMutationRef = useRef(throttledMutation);

  useEffect(() => {
    if (productId && currentProductName) {
      throttledMutationRef.current({ id: productId, name: currentProductName });
    }
  }, [productId, currentProductName]);

  return {
    product,
    isLoading: isLoading || isFetching,
    error,
    register,
    watch,
    nameValidationError: mutation.isError,
    control,
    resetForm: reset
  };
};
