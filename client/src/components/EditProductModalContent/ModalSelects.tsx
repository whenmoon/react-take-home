import React from 'react';
import { Select } from '../Select';
import { ProductCategoryData, SelectOption } from '../ProductList/types';
import { Product } from '../../api/types';
import { ProductForm } from './types';
import { Control, FieldErrors } from 'react-hook-form';
import { CLOTHING_SIZES, FOOTWEAR_SIZES } from '../../constants';
import { createSelectOptions } from '../ProductList/utils';
import { getDefaultSelectValue } from './utils';

type ModalSelectsProps = {
  productCategoryData?: ProductCategoryData;
  product?: Product;
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

  const { brand, style, colour, materials: productMaterials, neckline } = product
    || { brand: '', style: '', colour: '', productMaterials: '', neckline: '' };

  const { types, features, brands, styles, colors, materials, necklines } = productCategoryData || {};

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
    ? createSelectOptions(FOOTWEAR_SIZES)
    : createSelectOptions(CLOTHING_SIZES);

  const showStyles = selectedProductType?.value === 'footwear' && styles;
  const showMaterials = selectedProductType?.value === 'outerwear' && materials;
  const showColors = selectedProductType?.value === 'dress' && colors;
  const showNecklines = selectedProductType?.value === 'top' && necklines;

  return (
    <>
      <Select
        options={types || []}
        name="type"
        label="Product Type"
        control={control}
        error={typeError}
      />
      {selectedProductType &&
        <>
          <Select
            options={brands || []}
            name="brand"
            label="Brand"
            defaultValue={getDefaultSelectValue(brand)}
            control={control}
            error={brandError}
          />
          {showStyles &&
            <Select
              options={styles}
              name="style"
              label="Style"
              defaultValue={getDefaultSelectValue(style)}
              control={control}
              error={styleError}
            />
          }
          {showMaterials &&
            <Select
              options={materials}
              name="material"
              label="Material"
              defaultValue={getDefaultSelectValue(productMaterials)}
              control={control}
              error={materialsError}
            />
          }
          {showColors &&
            <Select
              options={colors}
              name="color"
              label="Color"
              defaultValue={getDefaultSelectValue(colour)}
              control={control}
              error={colorsError}
            />
          }
          {showNecklines &&
            <Select
              options={necklines}
              name="neckline"
              label="NeckLine"
              defaultValue={getDefaultSelectValue(neckline)}
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
            options={features?.[selectedProductType.value as keyof typeof features] || []}
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