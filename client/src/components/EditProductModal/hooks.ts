import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product, ValidationRequestBody } from "../../api/types";
import { Control, FieldErrors, UseFormRegister, UseFormReset, UseFormWatch, useForm } from "react-hook-form";
import { ProductForm } from "./types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { throttle } from 'lodash';
import { useModalContext } from "../../context/ModalContext";
import { parseFormData } from "./utils";
import { SetProductUpdateSuccess } from "../ProductList/types";

export const useEditProduct = (productId: number | null, setProductUpdateSuccess: SetProductUpdateSuccess): {
  product?: Product
  isLoading: boolean;
  productQueryError: Error | null;
  register: UseFormRegister<ProductForm>
  watch: UseFormWatch<ProductForm>
  nameValidationError: boolean | null;
  control: Control<ProductForm>
  resetForm: UseFormReset<ProductForm>
  setProductId: Dispatch<SetStateAction<number | null>>
  submitForm: () => Promise<void>
  inputValidationErrors: FieldErrors<ProductForm>
  formSubmitionError: Error | null;
} => {
  const { data: product, isFetching, isLoading, error: productQueryError } = useQuery({
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
      reset({
        ...getValues(),
        sizes: [],
        features: []
      });
    }
  }, [watch('type')?.value]);

  const { mutate: validationMutation, isError: isValidationMutationError } = useMutation({
    mutationFn: (data: ValidationRequestBody) => api.products.validateProductName(data),
  });

  const throttledMutation = throttle((data: ValidationRequestBody): void => {
    validationMutation(data);
  }, 500);

  const throttledMutationRef = useRef(throttledMutation);

  const currentProductName = watch('name');

  useEffect(() => {
    if (productId && currentProductName) {
      throttledMutationRef.current({ id: productId, name: currentProductName });
    }
  }, [productId, currentProductName]);

  const { setProductId } = useModalContext();

  const { mutateAsync: updateProduct, error: formSubmitionError } = useMutation({
    mutationFn: (data: Product) => api.products.updateProduct(data),
  });

  const onSubmit = async (data: ProductForm): Promise<void> => {
    if (product && productId) {
      try {
        const updatedProduct = { ...product, ...parseFormData(data, productId) };
        console.log('product', product);

        await updateProduct(updatedProduct);
        setProductId(null);
        setProductUpdateSuccess({ message: `Product id ${productId} updated successfully` });
      } catch (error: unknown) {
        //if (error instanceof Error) {
        throw new Error(JSON.stringify(error) || "Failed to update product. Please try again.");
        //}
      }
    } else {
      //await mutation.mutateAsync(data);
    }
  };

  const submitForm: () => Promise<void> = () => handleSubmit(onSubmit)();

  return {
    product,
    isLoading: isLoading || isFetching,
    productQueryError,
    register,
    watch,
    nameValidationError: isValidationMutationError,
    control,
    resetForm: reset,
    setProductId,
    submitForm,
    inputValidationErrors: errors,
    formSubmitionError,
  };
};
