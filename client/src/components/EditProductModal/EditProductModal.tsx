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
  const { productId, newProduct } = useModalContext();

  return (
    <ReactModal
      isOpen={!!productId || newProduct}
      ariaHideApp={false}
      style={{
        overlay: {
          width: '75%',
          height: '75%',
          opacity: 0.95,
          position: 'absolute',
          top: '10%',
          left: '12.5%',
        }
      }}
    >
      <EditProductModalContent
        productId={productId}
        productCategoryData={productCategoryData}
        setProductUpdateSuccess={setProductUpdateSuccess}
        newProduct={newProduct}
      />
    </ReactModal>
  );
};
