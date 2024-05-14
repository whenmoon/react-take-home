export type ProductType = 'footwear' | 'activewear' | 'outerwear' | 'dress' | 'top';
export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL'
export type FootwareSize = 'US 7' | 'US 8' | 'US 9' | 'US 10'

export type Product = {
  id: number,
  type: ProductType;
  name: string,
  sizes: ClothingSize[] | FootwareSize[],
  features: string[],
  brand: string,
  colour?: string,
  style?: string,
  materials?: string,
  neckline?: string,
}

export type ValidationRequestBody = {
  id?: number,
  name: string,
}

export type ProductWithoutId = Omit<Product, 'id'>;