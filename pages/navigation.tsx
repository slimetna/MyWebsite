import styles from "../styles/global.module.css";
import Link from "next/link";
import React from "react";

// On crée un composant pour réutiliser la navigation dans toutes les pages sans avoir à la réécrire à chaque fois la fonction entière

export default function Navigation() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      />
      <header>
        <div className="links">
          <Link href="/">
            <li>HOME</li>
          </Link>
          <Link href="/category">
            <li>CATEGORIES</li>
          </Link>
          <Link href="/product">
            <li>PRODUCTS</li>
          </Link>
        </div>
        <h1> BIRDWEAR - バードウェア </h1>
        <div className="icons">
          <Link href="/cart">
            <i className="las la-shopping-cart" />
          </Link>
          <Link href="/register">
            <i className="las la-user"> </i>
          </Link>
        </div>
      </header>
    </div>
  );
}
