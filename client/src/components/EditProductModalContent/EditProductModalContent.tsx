import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { ErrorAlert } from "../ErrorAlert";
import { Loading } from "../Loading";
import { CLOTHING_SIZES, FOOTWARE_SIZES } from "../../constants";
import { ProductCategoryData } from "../ProductList/types";
import { Select } from "../Select";
import { capitalise, createSelectOptions } from "../ProductList/utils";


type EditProductModalContentProps = {
  productId: number | null;
  productCategoryData: ProductCategoryData;
};

export const EditProductModalContent = ({
  productId,
  productCategoryData,
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
  } = useEditProduct(productId);

  if (productQueryError || formSubmitionError) {
    return (
      <div>
        <ErrorAlert error={productQueryError || formSubmitionError} />
        <form method="dialog">
          <button className="btn ">Close</button>
        </form>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  const handleCloseModal = () => {
    console.log('handleCloseModal');

    resetForm();
    setProductId(null);
  };

  if (product) {
    const { name, brand } = product;
    const { types, features, brands } = productCategoryData;
    const selectedProductType = watch("type");

    const sizeOptions = selectedProductType?.value === 'footwear'
      ? createSelectOptions(FOOTWARE_SIZES)
      : createSelectOptions(CLOTHING_SIZES);

    const {
      name: nameError,
      type: typeError,
      sizes: sizesError,
      features: featuresError,
      brand: brandError
    } = inputValidationErrors;

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
          <Select
            options={types}
            name="type"
            label="Product Type"
            control={control}
            error={typeError}
          />
          {selectedProductType &&
            <>
              <Select
                options={sizeOptions}
                name="sizes"
                label="Available sizes"
                control={control}
                isMulti
                error={sizesError}
              />
              <Select
                options={features}
                name="features"
                label="Available features"
                control={control}
                isMulti
                error={featuresError}
              />
              <Select
                options={brands}
                name="brand"
                label="Brand"
                defaultValue={{ value: brand, label: capitalise(brand) }}
                control={control}
                error={brandError}
              />
            </>
          }
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
