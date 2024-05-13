import React, { ReactElement } from "react";
import { useEditProduct } from "../EditProductModal/hooks";
import { ErrorAlert } from "../ErrorAlert";
import { Loading } from "../Loading";


type EditProductModalContentProps = {
  productId: number | null;
};

export const EditProductModalContent = ({ productId }: EditProductModalContentProps): ReactElement => {
  const { product, isLoading, error } = useEditProduct(productId);

  console.log(product);

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
    return (
      <div className="flex justify-center items-center">
        <h3 className="font-bold text-lg">Edit Product Information</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
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
