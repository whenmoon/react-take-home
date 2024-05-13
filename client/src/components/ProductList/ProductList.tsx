import React, { ReactElement } from "react";
import { useProducts } from "../AppContainer/hooks";
import { Loading } from "../Loading/Loading";
import { ErrorAlert } from "../ErrorAlert";
import { ProductListItem } from "../ProductListItem";
import { EditProductModal } from "../EditProductModal";

export const ProductList = (): ReactElement => {

  const { products, isLoading, error } = useProducts();

  if (error) return <ErrorAlert error={error} />;

  if (isLoading) return <Loading />;

  if (products && products.length > 0) {
    return (
      <div className="w-full">
        {products.map((product, idx) =>
          <ProductListItem
            key={`${product.id}-${idx}`}
            product={product} />
        )}
        <EditProductModal />
      </div>
    );
  } else {
    return (
      <div className="prose italic">
        <h1>Sorry, no products found.</h1>
      </div>
    );
  }
};
