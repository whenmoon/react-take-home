export const parseProductSpecifications = (specifications: string[] | undefined): string | undefined =>
  specifications?.join?.(", ");
