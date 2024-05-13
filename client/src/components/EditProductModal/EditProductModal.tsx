import React, { ReactElement } from "react";
import { EDIT_PRODUCT_MODAL_ID } from "../../constants";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";
import { ProductCategoryData } from "../ProductList/types";

type EditProductModalProps = {
  productCategoryData: ProductCategoryData;
};

export const EditProductModal = ({ productCategoryData }: EditProductModalProps): ReactElement => {
  const { productId } = useModalContext();
  console.log(productId);

  return (
    <dialog id={EDIT_PRODUCT_MODAL_ID} className="modal">
      <div className="modal-box">
        <EditProductModalContent productId={productId} productCategoryData={productCategoryData} />
      </div>
    </dialog >
  );
};
