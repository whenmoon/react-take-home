import React, { ReactElement } from "react";
import { ProductList } from "../ProductList";

export const AppContainer = (): ReactElement => (
  <div className="min-h-screen flex justify-center items-center p-12">
    <ProductList />
  </div>
);
