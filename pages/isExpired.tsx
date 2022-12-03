import jwt from "jsonwebtoken";
import React from "react";

// Fonction permettant de vérifier si le token est expiré ou non, si oui, on renvoie true, sinon false

export default function isExpired() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      return true;
    }
    const decoded = jwt.decode(token);
    const dateNow = new Date();
    if (decoded !== null && decoded?.exp < dateNow) {
      return false;
    }
  }
  return true;
}
