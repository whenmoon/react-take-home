import React, { ReactElement } from "react";
import { useProducts } from "../AppContainer/hooks";
import { Loading } from "../Loading/Loading";
import { ErrorAlert } from "../ErrorAlert";
import { ProductListItem } from "../ProductListItem";

export const ProductList = (): ReactElement => {

  const { products, isLoading, error } = useProducts();

  if (error) return <ErrorAlert error={error} />;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      {products?.map((product, idx) =>
        <ProductListItem
          key={`${product.id}-${idx}`}
          product={product} />
      )}
    </div>
  );
};
