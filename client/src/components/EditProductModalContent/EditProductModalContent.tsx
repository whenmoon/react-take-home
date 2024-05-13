import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { ErrorAlert } from "../ErrorAlert";
import { Loading } from "../Loading";
import { CLOTHING_SIZES, FOOTWARE_SIZES } from "../../constants";
import { ProductCategoryData } from "../ProductList/types";
import { Select } from "../Select";
import { createSelectOptions } from "../ProductList/utils";
//import { PropsValue } from "react-select";


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
    error,
    register,
    watch,
    nameValidationError,
    control,
    resetForm,
    setProductId,
  } = useEditProduct(productId);


  if (error) return (
    <div>
      <ErrorAlert error={error} />
      <form method="dialog">
        <button className="btn ">Close</button>
      </form>
    </div>
  );

  if (isLoading) return <Loading />;


  const handleCloseModal = () => {
    resetForm();
    setProductId(null);
  };

  if (product) {
    const { name, type, id, brand } = product;
    const { types, features, brands } = productCategoryData;
    const selectedProductType = watch("type");

    const sizeOptions = selectedProductType?.value === 'footwear'
      ? createSelectOptions(FOOTWARE_SIZES)
      : createSelectOptions(CLOTHING_SIZES);

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
              {...register("name")}
            />
            {nameValidationError &&
              <div className="label">
                <span className="label-text text-red-600">Error: product name must be unique.</span>
              </div>}
          </label>
          <Select
            options={types}
            name="type"
            label="Product Type"
            control={control}
          />
          {selectedProductType &&
            <>
              <Select
                options={sizeOptions}
                name="sizes"
                label="Available sizes"
                control={control}
                isMulti
              />
              <Select
                options={features}
                name="features"
                label="Available features"
                control={control}
                isMulti
              />
              <Select
                options={brands}
                name="brand"
                label="Brand"
                defaultValue={createSelectOptions([brand])[0]}
                control={control}
              />
            </>
          }
          <div className="flex gap-6 justify-end">
            <div className="modal-action">
              <button className="btn btn-accent" onClick={handleCloseModal}>Submit Changes</button>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </form>
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
