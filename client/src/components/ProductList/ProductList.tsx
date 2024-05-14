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
    handleCreateProduct
  } = useProducts();

  if (error) return <Alert message={error?.message} type="error" />;

  if (isLoading) return <Loading />;

  if (products && products.length > 0) {
    return (
      <>
        <div className="w-full">
          <div className="flex justify-between pr-4">
            <div className="prose pl-4 self-end mb-4">
              <h1
                className="leading-[0px] text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{`Products (${products.length})`}
              </h1>
            </div>
            <button
              className="btn btn-warning text-base md:text-lg lg:text-xl xl:text-2xl"
              onClick={handleCreateProduct}>
              Create Product
            </button>
          </div>
          {productUpdateSuccess && <Alert message={productUpdateSuccess.message} type="success" />}
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
