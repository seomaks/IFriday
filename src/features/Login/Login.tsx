import React, {
  ChangeEvent,
  FormEvent,
  useState
} from "react";
import style from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import { Navigate } from "react-router-dom";
import {loginTC} from "../../store/login-reducer";
import {ErrorType} from "../../store/app-reducer";

export const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.signIn.isLoggedIn)
  const isError = useSelector<AppStateType, ErrorType>(state => state.app.error)

  const [login, setLogin] = useState(() => {
    return {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setLogin(login => ({...login, [e.target.name]: e.target.value}));
  }
  const checkboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setLogin(login => ({...login, [e.target.name]: e.target.checked}));
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!login.email) {
      alert("You did not enter email")
    } else if (!login.password) {
      alert("You did not enter password")
    } else {
       dispatch(loginTC(login));
    }
  }

  if (isLoggedIn) {
    return <Navigate to={"/profile"}/>
  }

  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <form name="form" onSubmit={handleSubmit}>
        <label>e-mail:
          <input type="text" name="email" value={login.email}
                 onChange={handleChange}/>
        </label>
        <label>password:
          <input type="password" name="password" value={login.password}
                 onChange={handleChange}/>
        </label>
        <label>
          Remember me
          <input type="checkbox" name="rememberMe" checked={login.rememberMe}
                 onChange={checkboxChange}/>
        </label>
        <input type="submit" value="Sign In"/>
      </form>
      {isError && <div className={style.formSummaryError}>
        {isError}
      </div>}
    </div>
  );
}