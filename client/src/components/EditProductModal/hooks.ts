import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product, ValidationRequestBody } from "../../api/types";
import { Control, FieldErrors, UseFormRegister, UseFormReset, UseFormWatch, useForm } from "react-hook-form";
import { ProductForm } from "./types";
import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { throttle } from 'lodash';
import { useModalContext } from "../../context/ModalContext";
import { parseFormData } from "./utils";

export const useEditProduct = (productId: number | null): {
  product?: Product
  isLoading: boolean;
  error: Error | null;
  register: UseFormRegister<ProductForm>
  watch: UseFormWatch<ProductForm>
  nameValidationError: boolean | null;
  control: Control<ProductForm>
  resetForm: UseFormReset<ProductForm>
  setProductId: Dispatch<SetStateAction<number | null>>
  submitForm: () => (e?: BaseSyntheticEvent | undefined) => Promise<void>
  errors: FieldErrors<ProductForm>
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
    watch,
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductForm>({ defaultValues: { name: product?.name } });

  useEffect(() => {
    if (watch('type')?.value) {
      // Reset sizes when the product type changes
      reset({ ...getValues(), sizes: [] });
    }
  }, [watch('type')?.value]);

  const validationMutation = useMutation({
    mutationFn: (data: ValidationRequestBody) => api.products.validateProductName(data),
  });

  const throttledMutation = throttle((data: ValidationRequestBody): void => {
    validationMutation.mutate(data);
  }, 500);

  const throttledMutationRef = useRef(throttledMutation);

  const currentProductName = watch('name');

  useEffect(() => {
    if (productId && currentProductName) {
      throttledMutationRef.current({ id: productId, name: currentProductName });
    }
  }, [productId, currentProductName]);

  const { setProductId } = useModalContext();

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: (data: Product) => api.products.updateProduct(data),
  });

  const onSubmit = async (data: ProductForm): Promise<void> => {
    if (product && productId) {
      const updatedProduct = { ...product, ...parseFormData(data, productId) };
      console.log('onSubmit', updatedProduct);
      await updateProduct(updatedProduct);
    } else {
      //await mutation.mutateAsync(data);
    }
  };

  const submitForm: () => (
    //@ts-expect-error - fix type
    e?: BaseSyntheticEvent | undefined) => Promise<void> = () => handleSubmit(onSubmit)();

  return {
    product,
    isLoading: isLoading || isFetching,
    error,
    register,
    watch,
    nameValidationError: validationMutation.isError,
    control,
    resetForm: reset,
    setProductId,
    submitForm,
    errors
  };
};
