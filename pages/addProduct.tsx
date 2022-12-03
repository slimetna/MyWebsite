import Head from "next/head";
import Image from "next/image";
import styles from "../styles/globals.module.css";
import Navigation from "./navigation";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../feature/product.slice";
import isExpired from "./isExpired";
import Link from "next/link";

export default function Login() {
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

  // On récupère les données du formulaire, on les stock puis on les envoie au serveur,
  // si le serveur renvoie un token, on le stock dans le local storage, sinon on affiche un message d'erreur

  const [id, setId] = useState(0);
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const Product = { id, name, price, image, createdAt, updatedAt, categoryId };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      id: id,
      name: name,
      price: price,
      image: image,
      createdAt: createdAt,
      updatedAt: updatedAt,
      categoryId: categoryId,
    };

    try {
      const response = await axios.post(
        "http://localhost:2002/products",
        data,
        {
          params: { name, price },
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );
      dispatch(addProduct(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="html">
      <Navigation />
      <div className="register-parent">
        <div className="register-child">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1> ADD PRODUCT </h1>
            <label htmlFor="name">
              {" "}
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />{" "}
            </label>
            <label htmlFor="price">
              {" "}
              <input
                type="text"
                name="price"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />{" "}
            </label>
            <button className="register_button"> ADD </button>
          </form>
        </div>
      </div>
    </div>
  );
}
