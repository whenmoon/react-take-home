import React, { ReactElement } from "react";
import { EDIT_PRODUCT_MODAL_ID } from "../../constants";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";

type EditProductModalProps = {
  productTypes: string[];
};

export const EditProductModal = ({ productTypes }: EditProductModalProps): ReactElement => {
  const { productId } = useModalContext();
  console.log(productId);

  return (
    <dialog id={EDIT_PRODUCT_MODAL_ID} className="modal">
      <div className="modal-box">
        <EditProductModalContent productId={productId} productTypes={productTypes} />
      </div>
    </dialog >
  );
};
