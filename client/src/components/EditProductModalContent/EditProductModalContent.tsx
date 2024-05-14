import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { Alert } from "../Alert";
import { Loading } from "../Loading";
import { ProductCategoryData, SetProductUpdateSuccess } from "../ProductList/types";
import { ModalSelects } from "../EditProductModal/ModalSelects";


type EditProductModalContentProps = {
  productId: number | null;
  productCategoryData?: ProductCategoryData;
  setProductUpdateSuccess: SetProductUpdateSuccess
};

export const EditProductModalContent = ({
  productId,
  productCategoryData,
  setProductUpdateSuccess
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
    formSubmitionError
  } = useEditProduct(productId, setProductUpdateSuccess);

  if (productQueryError || formSubmitionError) {
    return (
      <div>
        <Alert
          message={productQueryError?.message || formSubmitionError?.message}
          type="error"
        />
        <form method="dialog">
          <button className="btn ">Close</button>
        </form>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  const handleCloseModal = () => {
    resetForm();
    setProductId(null);
  };

  if (product) {
    const { name } = product;

    const selectedProductType = watch("type");

    const { name: nameError } = inputValidationErrors;

    return (
      <>
        <form>
          <h3 className="font-bold text-lg" >Edit Product Information</h3>
          <label className="form-control w-full max-w-xs">
            <div className="label mt-4">
              <span className="label-text">Product name</span>
            </div>
            <input
              type="text"
              placeholder="Product name"
              className="input input-bordered input-accent w-full max-w-xs"
              defaultValue={name}
              {...register("name", { required: true })}
              autoComplete="off"
              aria-autocomplete="none"
            />
            {nameValidationError || nameError &&
              <div className="label">
                <span className="label-text text-red-600">
                  Error: product name must not be left blank and be unique.
                </span>
              </div>}
          </label>
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
