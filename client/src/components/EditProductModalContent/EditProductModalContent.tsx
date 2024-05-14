import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { Alert } from "../Alert";
import { Loading } from "../Loading";
import { ProductCategoryData, SetProductUpdateSuccess } from "../ProductList/types";
import { ModalSelects } from "../EditProductModal/ModalSelects";
import { TextInput } from "../TextInput";

type EditProductModalContentProps = {
  productId?: number;
  productCategoryData?: ProductCategoryData;
  setProductUpdateSuccess: SetProductUpdateSuccess
  newProduct: boolean;
};

export const EditProductModalContent = ({
  productId,
  productCategoryData,
  setProductUpdateSuccess,
  newProduct
}: EditProductModalContentProps): ReactElement => {
  const {
    product,
    isLoading,
    productQueryError,
    register,
    watch,
    nameValidationError,
    control,
    resetForm,
    setProductId,
    submitForm,
    inputValidationErrors,
    formSubmitionError,
    setNewProduct
  } = useEditProduct(setProductUpdateSuccess, newProduct, productId);

  const handleCloseModal = () => {
    resetForm();
    if (newProduct) {
      setNewProduct(false);
    } else {
      setProductId(undefined);
    }
  };

  if (productQueryError || formSubmitionError) {
    return (
      <div className="h-full flex justify-center" >
        <div>
          <div className="mt-32">
            <Alert
              message={productQueryError?.message || formSubmitionError?.message}
              type="error"
            />
          </div>
          <button className="btn w-max flex m-32" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (product || newProduct) {
    const { name } = product || { name: '' };

    const selectedProductType = watch("type");

    const { name: nameError } = inputValidationErrors;

    return (
      <>
        <form>
          <h3 className="font-bold text-lg" >{`${newProduct ? 'Add' : 'Edit'} Product Information`}</h3>
          <TextInput name={name} nameValidationError={nameValidationError} nameError={nameError} register={register} />
          <ModalSelects
            product={product}
            productCategoryData={productCategoryData}
            inputValidationErrors={inputValidationErrors}
            selectedProductType={selectedProductType}
            control={control}
          />
        </form>
        <div className="flex gap-6 justify-end">
          <div className="modal-action">
            <button className="btn btn-accent" type="submit" onClick={submitForm}>Submit Changes</button>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="prose italic">
        <h1>Sorry, no product found with product ID.</h1>
        <button className="btn" onClick={handleCloseModal}>Close</button>
      </div>
    );
  }
};
