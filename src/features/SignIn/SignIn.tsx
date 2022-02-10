import React from "react";
import style from './SignIn.module.css'

export const SignIn = () => {
  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <form>
        <label>
          <input type="text" name="email"/>
        </label>
        <label>
          <input type="password" name="password"/>
        </label>
        <label>
          Remember me
          <input type="checkbox" checked={false}/>
        </label>
        <input type="submit" value="Sign In"/>
      </form>
    </div>
  );
}