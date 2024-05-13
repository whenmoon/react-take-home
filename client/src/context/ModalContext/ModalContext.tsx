import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

type ModalContext = {
  productId: number | null;
  setProductId: Dispatch<SetStateAction<number | null>>
}

const ModalContext = createContext<ModalContext | null>(null);

type ModalContextProviderProps = PropsWithChildren

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [productId, setProductId] = useState<number | null>(null);

  return <ModalContext.Provider value={{ productId, setProductId }}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalContextProvider");
  }
  return context;
};