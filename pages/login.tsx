import Head from "next/head";
import Image from "next/image";
import styles from "../styles/global.module.css";
import Navigation from "./navigation";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Router from "next/router";

export default function Login() {
  // On récupère les données du formulaire, on les stock puis on les envoie au serveur,
  // si le serveur renvoie un token, on le stock dans le local storage, sinon on affiche un message d'erreur

  const token = localStorage.getItem("accessToken");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const User = { username, password };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:2002/auth", User, {
        params: { username, password },
        headers: { "Content-Type": "application/json", Authorization: token },
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data;
      localStorage.setItem("accessToken", accessToken);
      console.log(localStorage.getItem("accessToken"));
      Router.push("/");
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
            <h1> LOGIN </h1>
            <label htmlFor="username">
              {" "}
              <input
                type="text"
                name="username"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />{" "}
            </label>
            <label htmlFor="password">
              {" "}
              <input
                type="text"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </label>
            <button className="register_button"> LOGIN </button>
          </form>
        </div>
      </div>
    </div>
  );
}
