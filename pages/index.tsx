import Head from "next/head";
import Image from "next/image";
import styles from "../styles/global.module.css";
import Navigation from "./navigation";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import Product_card from "./product_card";
import isExpired from "./isExpired";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../feature/product.slice";
import dynamic from "next/dynamic";

export default function Home(this: any) {
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

  // Appel à l'API pour récupérer les produits

  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.product.product);

  useEffect(() => {
    axios
      .get("http://localhost:2002/products", {
        headers: { Authorization: token },
      })
      .then((response) => dispatch(setProduct(response.data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      <Navigation />
      <video autoPlay muted preload="auto" loop>
        <source src="background.mp4" type="video/mp4" />
      </video>
      <div className="LastDrop">
        <h1 className="LastDropText"> LAST DROP - しんはつばい </h1>
        <div className="products">
          {productData?.map((product: any, index: any) => (
            <Product_card key={index} product={product} />
          ))}
          <footer>
            <div className="subscribe">
              <h1 className="subnews"> SUBSCRIBE TO OUR NEWSLETTER </h1>
              <h1 className="subnewsjap"> サインアップ ニュ〡スレタ〡へ </h1>
            </div>
            <div className="inputMail">
              <input type="email" name="email" placeholder="E-MAIL" />
              <button className="subscribe_button">
                <p> SUBSCRIBE </p>
              </button>
            </div>
            <div className="mentions">
              <li> ABOUTS US </li>
              <li> CONTACT US </li>
              <li> TERMS AND CONDITIONS </li>
              <li> LEGAL MENTIONS </li>
            </div>
            <h1 className="copyright"> © 2022 BIRDWEAR - バードウェア </h1>
          </footer>
        </div>
      </div>
    </div>
  );
}
