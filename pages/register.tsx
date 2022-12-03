import Head from "next/head";
import Image from "next/image";
import Navigation from "./navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import FormDate from 'form-data';
import React from 'react';

export default function Register() {

  const token = localStorage.getItem("accessToken");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const User = { username, password, email };
    axios
      .post("http://localhost:2002/register", User, { params: { email, username, password }, headers: { 'Authorization': token } })
      .then(() => console.log('User created'))
      .catch((error) => console.log(error));
  };

  return (
    <div className="html">
      <Navigation />
      <div className="register-parent">
        <div className="register-child">
          <form onSubmit={handleSubmit} id="loginForm" >
            <h1> CREATE AN ACCOUNT </h1>
            <label htmlFor="email"> <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL" /> </label>
            <label htmlFor="username"> <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME" /> </label>
            <label htmlFor="password"> <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" /> </label>
            <button className="register_button" type="submit"> REGISTER </button>
            <h1>
              Already have an account ? <Link href="/login"> Login </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
