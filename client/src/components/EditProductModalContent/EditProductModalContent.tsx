import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { ErrorAlert } from "../ErrorAlert";
import { Loading } from "../Loading";
import { capitalise } from "./utils";


type EditProductModalContentProps = {
  productId: number | null;
  productTypes: string[];
};

export const EditProductModalContent = ({ productId, productTypes }: EditProductModalContentProps): ReactElement => {
  const { product, isLoading, error, register } = useEditProduct(productId);

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
    const { name, id } = product;
    return (
      <div >
        <h3 className="font-bold text-lg">Edit Product Information</h3>
        <label className="form-control w-full max-w-xs">
          <div className="label mt-4">
            <span className="label-text">Product name</span>
          </div>
          <input
            type="text"
            placeholder="Product name"
            className="input input-bordered input-primary w-full max-w-xs"
            defaultValue={name}
            {...register("productName")}
          />
          <div className="label">
          </div>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Product type</span>
          </div>
          <select className="select select-bordered">
            <option disabled selected>Pick one</option>
            {productTypes.map((type, idx) => (
              <option key={`${type}-${idx}`} value={type}>
                {capitalise(type)}
              </option>
            ))}
          </select>
        </label>
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
