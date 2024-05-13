import React, { ReactElement } from "react";
import { useProducts } from "../AppContainer/hooks";
import { Loading } from "../Loading/Loading";
import { ErrorAlert } from "../ErrorAlert";

export const ProductList = (): ReactElement => {

  const { products, isLoading, error } = useProducts();

  if (error) return <ErrorAlert error={error} />;

  if (isLoading) return <Loading />;

  return (
    <div>
      Product List
    </div>
  );
};
