import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import Navigation from "./navigation";
import Product_card from "./product_card";
import jwt from "jsonwebtoken";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../feature/product.slice";
import dynamic from "next/dynamic";
import isExpired from "./isExpired";
import Cart from "./cart";
import Pagination from "./Pagination";
import React from "react";
import Specific_Product from "./specificProduct";

export default function Product() {
  const Router = useRouter();

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

  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.product.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [specificProduct, setSpecificProduct] = useState(0);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = productData?.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    axios
      .get("http://localhost:2002/products", {
        headers: { Authorization: token },
      })
      .then((response) => dispatch(setProduct(response.data)))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchTerm = (e: any) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div>
      <Navigation />
      <div className="AllProducts">
        <h1 className="AllProductsText"> ALL PRODUCTS - すべての製品 </h1>
        <div className="searchbar">
          <input type="text" placeholder="Search" onChange={handleSearchTerm} />
        </div>
        <div className="products" id="products">
          {currentPosts
            ?.filter((val: any) => {
              return val.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((product: any, index: any) => (
              <div>
                <Product_card key={index} product={product} />
              </div>
            ))}
        </div>
        <Pagination
          totalPosts={productData?.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
