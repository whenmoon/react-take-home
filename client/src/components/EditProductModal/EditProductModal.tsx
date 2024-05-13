import React, { ReactElement } from "react";
import { EDIT_PRODUCT_MODAL_ID } from "../../constants";
import { useModalContext } from "../../context/ModalContext";

export const EditProductModal = (): ReactElement => {


  const { productId } = useModalContext();
  console.log('productId', productId);

  return (
    <>
      <dialog id={EDIT_PRODUCT_MODAL_ID} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog >
    </>
  );
};
