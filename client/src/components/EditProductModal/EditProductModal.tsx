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

  return (
    <dialog id={`${EDIT_PRODUCT_MODAL_ID}-${productId}`} className="modal">
      <div className="modal-box min-h-[520px]">
        <EditProductModalContent productId={productId} productCategoryData={productCategoryData} />
      </div>
    </dialog >
  );
};
