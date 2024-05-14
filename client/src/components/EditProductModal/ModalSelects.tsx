import React from 'react';
import { Select } from '../Select';
import { ProductCategoryData, SelectOption } from '../ProductList/types';
import { Product } from '../../api/types';
import { ProductForm } from './types';
import { Control, FieldErrors } from 'react-hook-form';
import { CLOTHING_SIZES, FOOTWARE_SIZES } from '../../constants';
import { capitalise, createSelectOptions } from '../ProductList/utils';

type ModalSelectsProps = {
  productCategoryData: ProductCategoryData;
  product: Product;
  control: Control<ProductForm>
  inputValidationErrors: FieldErrors<ProductForm>
  selectedProductType: SelectOption
}

export const ModalSelects = ({
  product,
  productCategoryData,
  inputValidationErrors,
  selectedProductType,
  control
}: ModalSelectsProps) => {

  const { brand, style, color, material, neckline } = product;
  const { types, features, brands, styles, colors, materials, necklines } = productCategoryData;

  const {
    type: typeError,
    sizes: sizesError,
    features: featuresError,
    brand: brandError,
    style: styleError,
    material: materialsError,
    color: colorsError,
    neckline: necklinesError
  } = inputValidationErrors;

  const sizeOptions = selectedProductType?.value === 'footwear'
    ? createSelectOptions(FOOTWARE_SIZES)
    : createSelectOptions(CLOTHING_SIZES);

  const showStyles = selectedProductType?.value === 'footwear' && styles && style;
  const showMaterials = selectedProductType?.value === 'outerwear' && materials && material;
  const showColors = selectedProductType?.value === 'dress' && colors && color;
  const showNecklines = selectedProductType?.value === 'top' && necklines && neckline;
  console.log('styles', styles);

  return (
    <>
      <Select
        options={types}
        name="type"
        label="Product Type"
        control={control}
        error={typeError}
      />
      {selectedProductType &&
        <>
          <Select
            options={brands}
            name="brand"
            label="Brand"
            defaultValue={{ value: brand, label: capitalise(brand) }}
            control={control}
            error={brandError}
          />
          {showStyles &&
            <Select
              options={styles}
              name="style"
              label="Style"
              defaultValue={{ value: style, label: capitalise(style) }}
              control={control}
              error={styleError}
            />
          }
          {showMaterials &&
            <Select
              options={materials}
              name="material"
              label="Material"
              defaultValue={{ value: material, label: capitalise(material) }}
              control={control}
              error={materialsError}
            />
          }
          {showColors &&
            <Select
              options={colors}
              name="color"
              label="Color"
              defaultValue={{ value: color, label: capitalise(color) }}
              control={control}
              error={colorsError}
            />
          }
          {showNecklines &&
            <Select
              options={necklines}
              name="neckline"
              label="NeckLine"
              defaultValue={{ value: neckline, label: capitalise(neckline) }}
              control={control}
              error={necklinesError}
            />
          }
          <Select
            options={sizeOptions}
            name="sizes"
            label="Available sizes"
            control={control}
            isMulti
            error={sizesError}
          />
          <Select
            options={features}
            name="features"
            label="Available features"
            control={control}
            isMulti
            error={featuresError}
          />
        </>
      }
    </>
  );
};