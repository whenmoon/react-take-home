import React, { Dispatch, PropsWithChildren, ReactElement, SetStateAction, createContext, useState } from "react";

type ModalContext = {
  productId?: number;
  setProductId: Dispatch<SetStateAction<number | undefined>>
  newProduct: boolean;
  setNewProduct: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContext | null>(null);

type ModalContextProviderProps = PropsWithChildren

export const ModalContextProvider = ({ children }: ModalContextProviderProps): ReactElement => {
  const [productId, setProductId] = useState<number>();
  const [newProduct, setNewProduct] = useState<boolean>(false);

  return <ModalContext.Provider value={{
    productId,
    setProductId,
    newProduct,
    setNewProduct
  }}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalContextProvider");
  }
  return context;
};