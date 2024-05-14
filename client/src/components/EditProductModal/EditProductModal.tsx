import React, { ReactElement } from "react";
import { EditProductModalContent } from "../EditProductModalContent";
import { useModalContext } from "../../context/ModalContext";
import { ProductCategoryData, SetProductUpdateSuccess } from "../ProductList/types";
import ReactModal from 'react-modal';
import { modalStyles } from "../EditProductModalContent/styles";

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
      style={modalStyles}
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
