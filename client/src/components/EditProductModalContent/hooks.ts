import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { Product, ProductWithoutId, ValidationRequestBody } from "../../api/types";
import { Control, FieldErrors, UseFormRegister, UseFormReset, UseFormWatch, useForm } from "react-hook-form";
import { ProductForm } from "./types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { throttle } from 'lodash';
import { useModalContext } from "../../context/ModalContext";
import { parseFormData } from "./utils";
import { SetProductUpdateSuccess } from "../ProductList/types";

export const useThrottledNameValidation = (
  data: ValidationRequestBody,
  watch: UseFormWatch<ProductForm>,
  newProduct: boolean,
  productId?: number
): boolean => {
  const { mutate: validationMutation, isError: isMutationError } = useMutation({
    mutationFn: (data: ValidationRequestBody) => api.products.validateProductName(data),
  });

  const throttledMutation = throttle((data: ValidationRequestBody): void => {
    validationMutation(data);
  }, 500);

  const throttledMutationRef = useRef(throttledMutation);

  const currentProductName = watch('name');

  useEffect(() => {
    if (currentProductName && (productId || newProduct)) {
      throttledMutationRef.current({ id: productId, name: currentProductName });
    }
  }, [productId, newProduct, currentProductName]);

  return isMutationError;
};

export const useEditProduct = (
  setProductUpdateSuccess: SetProductUpdateSuccess,
  newProduct: boolean,
  productId?: number
): {
  product?: Product
  isLoading: boolean;
  productQueryError: Error | null;
  register: UseFormRegister<ProductForm>
  watch: UseFormWatch<ProductForm>
  nameValidationError: boolean | null;
  control: Control<ProductForm>
  resetForm: UseFormReset<ProductForm>
  setProductId: Dispatch<SetStateAction<number | undefined>>
  submitForm: () => Promise<void>
  inputValidationErrors: FieldErrors<ProductForm>
  formSubmissionError: Error | null;
  setNewProduct: Dispatch<SetStateAction<boolean>>
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

  // Reset type dependent options when the product type changes
  useEffect(() => {
    if (watch('type')?.value) {
      reset({
        ...getValues(),
        sizes: [],
        features: []
      });
    }
  }, [watch('type')?.value]);

  const nameValidationError = useThrottledNameValidation(
    { id: productId, name: watch('name') },
    watch,
    newProduct,
    productId
  );

  const { setProductId, setNewProduct } = useModalContext();

  const { mutateAsync: updateProduct, error: formSubmissionUpdateError } = useMutation({
    mutationFn: (data: Product) => api.products.updateProduct(data),
  });

  const { mutateAsync: createProduct, error: formSubmissionCreateError } = useMutation({
    mutationFn: (data: ProductWithoutId) => api.products.addProduct(data),
  });

  const onSubmit = async (data: ProductForm): Promise<void> => {
    try {
      if (product && productId) {
        const updatedProduct = { ...product, ...parseFormData(data, productId) };
        await updateProduct(updatedProduct);
        setProductId(undefined);
        setProductUpdateSuccess({ message: `Product id ${productId} updated successfully` });
      } else if (newProduct) {
        const createdProduct = await createProduct(parseFormData(data));
        const { id } = createdProduct;
        setNewProduct(false);
        setProductUpdateSuccess({ message: `Product id ${id} updated successfully` });
      }
    } catch (error: unknown) {
      throw new Error(JSON.stringify(error) || 'Failed to update product. Please try again.');
    } finally {
      reset();
    }
  };

  const submitForm: () => Promise<void> = () => handleSubmit(onSubmit)();

  return {
    product,
    isLoading: isLoading || isFetching,
    productQueryError,
    register,
    watch,
    nameValidationError,
    control,
    resetForm: reset,
    setProductId,
    submitForm,
    inputValidationErrors: errors,
    formSubmissionError: formSubmissionUpdateError || formSubmissionCreateError,
    setNewProduct
  };
};
