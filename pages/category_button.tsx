import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setProduct } from "../feature/product.slice";
import { useEffect } from "react";
import { setCategory } from "../feature/category.slice";
import isExpired from "./isExpired";
import Link from "next/link";
import React from "react";

export default function Category_Button({ category }) {
  if (isExpired() === true) {
    return (
      <div className="redirect" suppressHydrationWarning={true}>
        <h1> Connectez vous pour accéder au site. </h1>
        <Link href="/login">
          {" "}
          <button> SE CONNECTER </button>{" "}
        </Link>
        <Link href="/register">
          {" "}
          <button> S'INSCRIRE </button>{" "}
        </Link>
      </div>
    );
  }

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:2002/Categories", {
        headers: { Authorization: token },
      })
      .then((response) => dispatch(setCategory(response.data)))
      .catch((error) => console.log(error));
  }, []);

  const dispatch = useDispatch();
  let productData = useSelector((state) => state.product.product);

  return <button value={category.id}> {category.name} </button>;
}
