import React from "react";
import { Product } from "../../api/types";

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
          <div className="stat-title capitalize font-bold p-1">{product.type}</div>
          <div className="stat-title capitalize font-bold p-1">{product.brand}</div>
          <div className="stat-title p-1">{`Available Sizes: ${sizes}`}</div>
          <div className="stat-title p-1">{`Features: ${features}`}</div>
          <div className="stat-actions flex">
            <button className="btn btn-sm btn-success">Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
