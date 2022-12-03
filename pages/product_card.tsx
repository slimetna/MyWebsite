import { useCart } from "react-use-cart";
import React from "react";
import Router from "next/router";

// On crée un composant pour nos produits, ça nous permet de légèrement allégé le code au moment du mapping dans la page product.tsx.

export default function Product_card({ product, setSpecificProduct }) {
  const { addItem } = useCart();

  const displaySpecificProduct = (e) => {
    localStorage.setItem("specificProduct", e.target.id);
    Router.push("/specificProduct");
  };

  return (
    <div>
      <img src={product.image} />
      <h1> {product.name} </h1>
      <h2> {product.price}.00€</h2>
      <div className="productsButton">
        <button className="buy" onClick={() => addItem(product)}>
          ADD TO CART
        </button>
        <button
          className="buy"
          id={product.name}
          onClick={(e) => displaySpecificProduct(e)}
        >
          DETAILS
        </button>
      </div>
    </div>
  );
}
