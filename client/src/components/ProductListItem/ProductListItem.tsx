import React from "react";
import { Product } from "../../api/types";
import { ProductItemLabel } from "../ProductItemLabel";

type ProductListItemProps = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const sizes = product.sizes.join(", ");
  const features = product.features.join(", ");

  return (
    <div className="p-3">
      <div className="stats bg-primary text-primary-content shadow-2xl w-full glass">
        <div className="stat">
          <div className="stat-value capitalize">{product.name}</div>
          <ProductItemLabel label={product.type} capitalize bold />
          <ProductItemLabel label={product.brand} capitalize bold />
          <ProductItemLabel label={`Available Sizes: ${sizes}`} />
          <ProductItemLabel label={`Features: ${features}`} />
          <div className="stat-actions flex">
            <button className="btn btn-md btn-accent">Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
