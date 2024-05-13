import React, { ReactElement } from "react";
import { Product } from "../../api/types";
import { ProductItemLabel } from "../ProductItemLabel";
import { parseProductSpecifications } from "./utils";

type ProductListItemProps = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps): ReactElement => {
  const { name, type, brand, sizes, features, colour, style, materials, neckline } = product;

  const availableSizes = parseProductSpecifications(sizes);
  const productFeatures = parseProductSpecifications(features);

  return (
    <div className="p-3">
      <div className="stats bg-primary text-primary-content shadow-2xl w-full glass">
        <div className="stat">
          <div className="stat-value capitalize">{name}</div>
          <ProductItemLabel label={type} capitalize bold />
          <ProductItemLabel label={brand} capitalize bold />
          <ProductItemLabel label={`Features: ${productFeatures}`} />
          <ProductItemLabel label={`Available Sizes: ${availableSizes}`} />
          {colour && <ProductItemLabel label={`Color: ${colour}`} />}
          {style && <ProductItemLabel label={`Style: ${style}`} />}
          {materials && <ProductItemLabel label={`Materials: ${materials}`} />}
          {neckline && <ProductItemLabel label={`Neckline: ${neckline}`} />}
          <div className="stat-actions flex">
            <button className="btn btn-md btn-accent">Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
