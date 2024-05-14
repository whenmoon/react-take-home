import { parseProductSpecifications } from './utils';

describe('parseProductSpecifications', () => {
  it('should return undefined if specifications is undefined', () => {
    const specifications = undefined;
    const result = parseProductSpecifications(specifications);
    expect(result).toBeUndefined();
  });

  it('should return a string with comma-separated values if specifications is an array', () => {
    const specifications = ['Color: Red', 'Size: Large', 'Material: Cotton'];
    const result = parseProductSpecifications(specifications);
    expect(result).toBe('Color: Red, Size: Large, Material: Cotton');
  });

  it('should return an empty string if specifications is an empty array', () => {
    const specifications: string[] = [];
    const result = parseProductSpecifications(specifications);
    expect(result).toBe('');
  });

  it('should return undefined if specifications is not an array', () => {
    const result = parseProductSpecifications(undefined);
    expect(result).toBeUndefined();
  });
});