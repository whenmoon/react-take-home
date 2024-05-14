import React, { ReactElement } from "react";
import { useProducts } from "./hooks";
import { Loading } from "../Loading/Loading";
import { Alert } from "../Alert";
import { ProductListItem } from "../ProductListItem";
import { EditProductModal } from "../EditProductModal";

export const ProductList = (): ReactElement => {
  const {
    products,
    isLoading,
    error,
    productCategoryData,
    productUpdateSuccess,
    setProductUpdateSuccess,
  } = useProducts();

  if (error) return <Alert message={error?.message} type="error" />;

  if (isLoading) return <Loading />;

  if (products && products.length > 0) {
    return (
      <>
        <div className="w-full">
          <div className="relative">
            {productUpdateSuccess && <Alert message={productUpdateSuccess.message} type="success" />}
          </div>
          {products.map((product, idx) =>
            <ProductListItem
              key={`${product.id}-${idx}`}
              product={product} />
          )}
          <EditProductModal
            productCategoryData={productCategoryData}
            setProductUpdateSuccess={setProductUpdateSuccess}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="prose italic">
        <h1>Sorry, no products found.</h1>
      </div>
    );
  }
};
