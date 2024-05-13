import React, { ReactElement } from "react";
//import { EDIT_PRODUCT_MODAL_ID } from "../../constants";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";
import { ProductCategoryData } from "../ProductList/types";
import ReactModal from 'react-modal';

type EditProductModalProps = {
  productCategoryData: ProductCategoryData;
};

export const EditProductModal = ({ productCategoryData }: EditProductModalProps): ReactElement => {
  const { productId } = useModalContext();

  return (
    //<dialog id={`${EDIT_PRODUCT_MODAL_ID}-${productId}`} className="modal">
    //<div className="flex justify-center align-middle">

    <ReactModal
      isOpen={!!productId}
      ariaHideApp={false}
      style={{
        overlay: {
          width: '75%',
          height: '75%',
          opacity: 0.95,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      <EditProductModalContent productId={productId} productCategoryData={productCategoryData} />
    </ReactModal>
    //</div >

    //</dialog >
  );
};
