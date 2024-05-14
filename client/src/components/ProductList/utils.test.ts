import { Product } from "../../api/types";
import { SelectOption } from "./types";
import { capitalise, createSelectOptions, getUniqueProductCategoryData } from "./utils";

describe("capitalise", () => {
  it("should capitalise the first letter of a string", () => {
    expect(capitalise("hello")).toBe("Hello");
    expect(capitalise("world")).toBe("World");
    expect(capitalise("")).toBe("");
  });
});

describe("createSelectOptions", () => {
  it("should create an array of SelectOptions from an array of strings", () => {
    const data = ["option1", "option2", "option3"];
    const expected: SelectOption[] = [
      { value: "option1", label: "Option1" },
      { value: "option2", label: "Option2" },
      { value: "option3", label: "Option3" },
    ];
    expect(createSelectOptions(data)).toEqual(expected);
  });
});

describe("getUniqueProductCategoryData", () => {
  it("should return the unique product category data from an array of products", () => {
    const products: Product[] = [
      {
        id: 2,
        name: "Urban Stride Casual Sneakers",
        type: "footwear",
        sizes: ["US 7", "US 8", "US 9"],
        features: ["Versatile design", "Canvas material", "Rubber sole"],
        brand: "UrbanSteps",
        style: "Slip on canvas",
      },
      {
        id: 3,
        name: "Performance Pro Sports Bra",
        type: "activewear",
        sizes: ["XS", "S", "M"],
        features: [
          "Moisture-wicking fabric",
          "Racerback design",
          "Medium support",
        ],
        brand: "FitFlex",
      },
    ];
    const expected = {
      types: [
        { value: "footwear", label: "Footwear" },
        { value: "activewear", label: "Activewear" },
      ],
      features: {
        footwear: [
          { value: "Versatile design", label: "Versatile design" },
          { value: "Canvas material", label: "Canvas material" },
          { value: "Rubber sole", label: "Rubber sole" },
        ],
        activewear: [
          { value: "Moisture-wicking fabric", label: "Moisture-wicking fabric" },
          { value: "Racerback design", label: "Racerback design" },
          { value: "Medium support", label: "Medium support" },
        ],
        outerwear: [],
        dress: [],
        top: [],
      },
      brands: [
        { value: "UrbanSteps", label: "UrbanSteps" },
        { value: "FitFlex", label: "FitFlex" },
      ],
      styles: [
        { value: "Slip on canvas", label: "Slip on canvas" },
      ],
      materials: null,
      colors: null,
      necklines: null,
    };
    expect(getUniqueProductCategoryData(products)).toEqual(expected);
  });
});