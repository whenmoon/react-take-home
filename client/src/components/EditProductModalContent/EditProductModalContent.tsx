import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { ErrorAlert } from "../ErrorAlert";
import { Loading } from "../Loading";
import { CLOTHING_SIZE, FOOTWARE_SIZE } from "../../constants";
import { ProductCategoryData } from "../ProductList/types";
import { Select } from "../Select";


type EditProductModalContentProps = {
  productId: number | null;
  productCategoryData: ProductCategoryData;
};

export const EditProductModalContent = ({
  productId,
  productCategoryData,
}: EditProductModalContentProps): ReactElement => {
  const { product, isLoading, error, register, watch, nameValidationError } = useEditProduct(productId);

  if (error) return (
    <div>
      <ErrorAlert error={error} />
      <form method="dialog">
        <button className="btn ">Close</button>
      </form>
    </div>
  );

  if (isLoading) return <Loading />;

  if (product) {
    const { name, type, id } = product;
    const { types, features, brands } = productCategoryData;
    const selectedProductType = watch("type");

    return (
      <div>
        <h3 className="font-bold text-lg">Edit Product Information</h3>
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
        <Select options={types} register={register} registerKey="type" label="Product Type" />
        {selectedProductType &&
          <>
            <Select
              options={selectedProductType === 'footware' ? FOOTWARE_SIZE : CLOTHING_SIZE}
              register={register}
              registerKey="sizes"
              label="Available sizes"
            />
            <Select
              options={features}
              register={register}
              registerKey="features"
              label="Available features"
            />
            <Select
              options={brands}
              register={register}
              registerKey="brand"
              label="Brand"
            />
          </>
        }
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="prose italic">
        <h1>Sorry, no product found with product ID.</h1>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    );
  }
};
