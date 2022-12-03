import Navigation from "./navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import isExpired from "./isExpired";
import Link from "next/link";
import { setProduct } from "../feature/product.slice";
import Product from "./product";
import React from "react";
import { useCart } from "react-use-cart";

export default function specificProduct() {
  const { addItem } = useCart();
  const dispatch = useDispatch();
  const productName = localStorage.getItem("specificProduct") || "";
  const productData = useSelector((state: any) => state.product.product).filter(
    (product: any) => product.name === productName
  );

  if (isExpired() === true) {
    return (
      <div className="redirect" suppressHydrationWarning={true}>
        <h1> Connectez vous pour accéder au site. </h1>
        <Link href="/login">
          <button> SE CONNECTER </button>
        </Link>
        <Link href="/register">
          <button> S'INSCRIRE </button>
        </Link>
      </div>
    );
  }

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:2002/products/", {
        headers: { Authorization: token },
      })
      .then((response) => dispatch(setProduct(response.data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="allSpecific">
      <Navigation />
      {productData?.map((product: any) => (
        <div className="specific_product">
          <div className="left">
            <img src={product.image} alt="" />
            <img src={product.image.replace("front", "back")} alt="" />
          </div>
          <div className="right">
            <h1 className="specific_title"> {product.name} </h1>
            <h2 className="specific_price"> {product.price}.00€ </h2>
            <h3> COULEUR </h3>
            <div className="black"></div>
            <div className="white"></div>
            <div className="taille">
              <h1> XS </h1>
              <h1> S </h1>
              <h1> M </h1>
              <h1> L </h1>
              <h1> XL </h1>
              <h1> XXL </h1>
            </div>
            <button className="add_to_cart" onClick={() => addItem(product)}>
              {" "}
              ADD TO CART{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
