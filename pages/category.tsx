import Head from "next/head";
import Image from "next/image";
import styles from "../styles/global.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./navigation";
import isExpired from "./isExpired";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../feature/product.slice";
import Product_card from "./product_card";
import Category_Button from "./category_button";
import { setCategory } from "../feature/category.slice";
import { handleClientScriptLoad } from "next/script";

export default function Categories() {
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
  const [categoryID, setCategoryID] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:2002/products", {
        headers: { Authorization: token },
      })
      .then((response) => dispatch(setProduct(response.data)))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:2002/Categories", {
        headers: { Authorization: token },
      })
      .then((response: any) => dispatch(setCategory(response.data)))
      .catch((error) => console.log(error));
  }, []);

  let productData = useSelector((state: any) => state.product.product);
  let categoryData = useSelector((state: any) => state.category.category);

  async function filter(e: any) {
    setCategoryID(e.target.value);
  }

  return (
    <div>
      <Navigation />
      <div className="AllProducts">
        <h1 className="AllProductsText"> CATEGORIES - カテゴリー </h1>
        <div
          className="categoriesButton"
          id="button"
          onClick={(e) => filter(e)}
        >
          {categoryData?.map((category: any) => (
            <Category_Button category={category} />
          ))}
          <button value={0} id="clear">
            {" "}
            CLEAR{" "}
          </button>
        </div>

        <div className="products">
          {productData
            ?.filter((val: any) => {
              if (+categoryID === 0) {
                return val;
              } else {
                return val.CategoryId === +categoryID;
              }
            })
            .map((product: any, index: any) => (
              <Product_card key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
