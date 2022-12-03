/**
 * @jest-environment jsdom
 */

import Product_card from "../product_card";
import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("Product Card", () => {
  test("check render product card", () => {
    const product = {
      name: "jest",
      price: 1,
    };
    render(<Product_card product={product} />);
    const productName = screen.getByText("jest");
    const productPrice = screen.getByText("1.00€");
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});
