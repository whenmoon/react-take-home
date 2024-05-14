import React, { ReactElement } from "react";
import { Product } from "../../api/types";
import { ProductItemLabel } from "../ProductItemLabel";
import { parseProductSpecifications } from "./utils";
import { useModalContext } from "../../context/ModalContext";

type ProductListItemProps = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps): ReactElement => {
  const { name, type, brand, sizes, features, color, style, material, neckline, id } = product;

  const availableSizes = parseProductSpecifications(sizes);
  const productFeatures = parseProductSpecifications(features);

  const { setProductId } = useModalContext();

  const handleEditProduct = () => {
    setProductId(id);
  };

  return (
    <div className="p-3">
      <div className="stats bg-primary text-primary-content shadow-2xl w-full glass">
        <div className="stat">
          <div className="stat-value capitalize">{name}</div>
          <ProductItemLabel label={type} capitalize bold />
          <ProductItemLabel label={brand} capitalize bold />
          <ProductItemLabel label={`Features: ${productFeatures}`} />
          <ProductItemLabel label={`Available Sizes: ${availableSizes}`} />
          {color && <ProductItemLabel label={`Color: ${color}`} />}
          {style && <ProductItemLabel label={`Style: ${style}`} />}
          {material && <ProductItemLabel label={`Materials: ${material}`} />}
          {neckline && <ProductItemLabel label={`Neckline: ${neckline}`} />}
          <div className="stat-actions flex">
            <button className="btn btn-md btn-accent" onClick={handleEditProduct}>Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};
