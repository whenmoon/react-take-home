import React, { ReactElement } from "react";
import { useEditProduct } from "./hooks";
import { Alert } from "../Alert";
import { Loading } from "../Loading";
import { ProductCategoryData, SetProductUpdateSuccess } from "../ProductList/types";
import { ModalSelects } from "./ModalSelects";
import { TextInput } from "../TextInput";

const responsiveButtonText = "text-base md:text-lg lg:text-xl xl:text-2xl";

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
    formSubmissionError,
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

  if (productQueryError || formSubmissionError) {
    return (
      <div className="h-full flex justify-center" >
        <div>
          <div className="mt-32">
            <Alert
              message={productQueryError?.message || formSubmissionError?.message}
              type="error"
            />
          </div>
          <button
            className="btn w-max flex m-32 text-base md:text-lg lg:text-xl xl:text-2xl"
            onClick={handleCloseModal}>
            Close
          </button>
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
        <div className="flex flex-col">
          <form>
            <h3
              className="font-bold text-1xl md:text-2xl lg:text-3xl xl:text-4xl">
              {`${newProduct ? 'Add' : 'Edit'} Product Information`}
            </h3>
            <TextInput
              name={name}
              nameValidationError={nameValidationError}
              nameError={nameError}
              register={register} />
            <ModalSelects
              product={product}
              productCategoryData={productCategoryData}
              inputValidationErrors={inputValidationErrors}
              selectedProductType={selectedProductType}
              control={control}
            />
          </form>
          <div className="flex flex-col justify-end bottom-5 right-5 md:absolute">
            <div className="modal-action">
              <button className={`btn btn-primary ${responsiveButtonText}`} onClick={handleCloseModal}>Close</button>
            </div>
            <div className="modal-action">
              <button
                className={`btn btn-accent ${responsiveButtonText}`} type="submit" onClick={submitForm}>
                Submit Changes
              </button>
            </div>
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
