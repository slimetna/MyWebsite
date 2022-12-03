import Head from "next/head";
import Image from "next/image";
import styles from "../styles/global.module.css";
import Navigation from "./navigation";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../feature/product.slice";
import isExpired from "./isExpired";
import Link from "next/link";

export default function Login() {
  // On récupère les données du formulaire, on les stock puis on les envoie au serveur,
  // si le serveur renvoie un token, on le stock dans le local storage, sinon on affiche un message d'erreur

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

  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const Product = { id };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        "http://localhost:2002/products/" + id,
        {
          params: { id },
          headers: { "Content-Type": "application/json", Authorization: token },
        }
      );
      dispatch(deleteProduct(response.data));
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
            <h1> DELETE PRODUCT </h1>
            <label htmlFor="id">
              {" "}
              <input
                type="text"
                name="id"
                placeholder="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />{" "}
            </label>
            <button className="register_button"> DELETE </button>
          </form>
        </div>
      </div>
    </div>
  );
}
