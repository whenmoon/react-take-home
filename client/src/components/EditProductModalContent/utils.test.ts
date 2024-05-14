import { parseFormData, getDefaultSelectValue } from "./utils";
import { ProductForm } from "./types";

describe("parseFormData", () => {
  const formData: ProductForm = {
    name: "Product Name",
    type: { value: "clothing", label: "Clothing" },
    brand: { value: "brand Name", label: "Brand Name" },
    sizes: [{
      value: "S",
      label: "S",
    }, {
      value: "M",
      label: "M",
    }],
    features: [{ value: "feature 1", label: "Feature 1" }, { value: "feature 2", label: "Feature 2" }],
    style: { value: "style", label: "Style" },
    color: { value: "color", label: "Color" },
    material: { value: "material", label: "Material" },
    neckline: { value: "neckline", label: "Neckline" },
  };

  const expected = {
    name: "Product Name",
    type: "clothing",
    brand: "brand Name",
    sizes: ["S", "M"],
    features: ["feature 1", "feature 2"],
    style: "style",
    colour: "color",
    materials: "material",
    neckline: "neckline",
  };

  it("should parse form data correctly without productId", () => {
    const result = parseFormData(formData);
    expect(result).toEqual(expected);
  });

  it("should parse form data correctly with productId", () => {
    const productId = 123;
    const expectedWithId = {
      id: 123,
      ...expected,
    };
    const result = parseFormData(formData, productId);
    expect(result).toEqual(expectedWithId);
  });
});

describe("getDefaultSelectValue", () => {
  it("should return undefined when value is undefined", () => {
    const value = undefined;
    const result = getDefaultSelectValue(value);
    expect(result).toBeUndefined();
  });

  it("should return SelectOption when value is defined", () => {
    const value = "option value";
    const expected = { value: "option value", label: "Option value" };
    const result = getDefaultSelectValue(value);
    expect(result).toEqual(expected);
  });
});