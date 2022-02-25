import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css"

export const Header = () => {
  return (
    <div className={style.header}>
      <Link to="/" className={style.item}>Home Page</Link>
      <Link to="sign-in" className={style.item}>Sign In</Link>
      <Link to="sign-up" className={style.item}>Sign Up</Link>
      <Link to="pass-recovery" className={style.item}>Password Recovery</Link>
      <Link to="packs" className={style.item}>Packs</Link>
    </div>
  );
}