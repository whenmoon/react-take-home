import React, { ReactElement } from "react";
import { useProducts } from "../AppContainer/hooks";

export const ProductList = (): ReactElement => {

  const { products } = useProducts();

  console.log('products', products);


  return (
    <div className="min-h-screen flex justify-center items-center">
      Product List
    </div>
  );
};