/**
 * @jest-environment jsdom
 */

import Category_button from "../category_button";
import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("Category Button", () => {
  test("check render category button", () => {
    const category = {
      category_id: 1,
      name: "jest_category",
    };
    const container = render(<Category_button category={category} />);
    const categoryName = screen.getByText("jest_category");
    const categoryButton = container.getByTestId("button");
    const categoryButtonValue = categoryButton.getAttribute("value");
    expect(categoryName).toBeInTheDocument();
    expect(categoryButtonValue).toBe(1);
  });
});
