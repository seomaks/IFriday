import React from "react";
import style from "../SignIn/SignIn.module.css";

export const SignUp = () => {
  return (
    <div className={style.container}>
      <h1>Sign Up</h1>
      <form>
        <label>
          <input type="text" name="text"/>
        </label>
        <label>
          <input type="text" name="text"/>
        </label>
        <label>
          <input type="text" name="text"/>
        </label>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  );
}