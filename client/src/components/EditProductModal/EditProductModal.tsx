import React, { ReactElement } from "react";
import { EDIT_PRODUCT_MODAL_ID } from "../../constants";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";

export const EditProductModal = (): ReactElement => {
  const { productId } = useModalContext();
  console.log(productId);

  return (
    <dialog id={EDIT_PRODUCT_MODAL_ID} className="modal">
      <div className="modal-box h-auto flex justify-center items-center">
        <EditProductModalContent productId={productId} />
      </div>
    </dialog >
  );
};
