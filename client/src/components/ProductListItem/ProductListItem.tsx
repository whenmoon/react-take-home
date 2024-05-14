import React, { ReactElement } from "react";
import { Product } from "../../api/types";
import { ProductItemLabel } from "../ProductItemLabel";
import { parseProductSpecifications } from "./utils";
import { useModalContext } from "../../context/ModalContext";

type ProductListItemProps = {
  product: Product;
};

export const ProductListItem = ({ product }: ProductListItemProps): ReactElement => {
  const { name, type, brand, sizes, features, colour, style, materials, neckline, id } = product;

  const availableSizes = parseProductSpecifications(sizes);
  const productFeatures = parseProductSpecifications(features);

  const { setProductId } = useModalContext();

  const handleEditProduct = () => {
    setProductId(id);
  };

  return (
    <div className="p-3">
      <div className="stats bg-primary text-primary-content shadow-2xl w-full glass">
        <div className="stat overflow-x-hidden p-4 border">
          <div className="stat-value capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{name}</div>
          <ProductItemLabel label={type} capitalize bold />
          <ProductItemLabel label={brand} capitalize bold />
          <ProductItemLabel label={`Features: ${productFeatures}`} />
          <ProductItemLabel label={`Available Sizes: ${availableSizes}`} />
          {colour && <ProductItemLabel label={`Color: ${colour}`} />}
          {style && <ProductItemLabel label={`Style: ${style}`} />}
          {materials && <ProductItemLabel label={`Materials: ${materials}`} />}
          {neckline && <ProductItemLabel label={`Neckline: ${neckline}`} />}
          <div className="stat-actions flex">
            <button
              className="btn btn-md btn-accent text-base md:text-lg lg:text-xl xl:text-2xl" onClick={handleEditProduct}>
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
