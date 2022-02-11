import React, {ChangeEvent, FormEvent, useState} from "react";
import style from "../SignIn/SignIn.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ErrorType, registerTC} from "./signup-reducer";
import {AppStateType} from "../../store/store";
import { Navigate } from "react-router-dom";

export const SignUp = () => {
  const dispatch = useDispatch()
  const isRegistered = useSelector<AppStateType, boolean>(state => state.signUp.isRegistered)
  const isError = useSelector<AppStateType, ErrorType>(state => state.signUp.error)

  const [register, setRegister] = useState(() => {
    return {
      email: "",
      password: "",
      password2: "",
    }
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.persist()
    setRegister(register => ({...register, [e.target.name]: e.target.value}));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!register.email) {
      alert("You did not enter email")
    } else if (register.password !== register.password2) {
      alert("Repeated password incorrectly")
    } else {
      dispatch(registerTC(register));
    }
  }

  if (isRegistered) {
    return <Navigate to={"/sign-in"}/>
  }

  return (
    <div className={style.container}>
      <h1>Sign Up</h1>
      <form name="form" onSubmit={handleSubmit}>
        <label>e-mail:
          <input type="text" name="email" value={register.email}
                 onChange={handleChange}/>
        </label>
        <label>password:
          <input type="password" name="password" value={register.password}
                 onChange={handleChange}/>
        </label>
        <label>confirm password:
          <input type="password" name="password2" value={register.password2}
                 onChange={handleChange}/>
        </label>
        <input type="submit" value="Sign Up"/>
      </form>
      {isError && <div className={style.formSummaryError}>
        {isError}
      </div>}
    </div>
  );
}
