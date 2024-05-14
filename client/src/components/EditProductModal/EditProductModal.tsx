import React, { ReactElement } from "react";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";
import { ProductCategoryData, SetProductUpdateSuccess } from "../ProductList/types";
import ReactModal from 'react-modal';

type EditProductModalProps = {
  productCategoryData?: ProductCategoryData;
  setProductUpdateSuccess: SetProductUpdateSuccess
};

export const EditProductModal = ({
  productCategoryData,
  setProductUpdateSuccess
}: EditProductModalProps): ReactElement => {
  const { productId } = useModalContext();

  return (
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
      <EditProductModalContent
        productId={productId}
        productCategoryData={productCategoryData}
        setProductUpdateSuccess={setProductUpdateSuccess}
      />
    </ReactModal>
  );
};
