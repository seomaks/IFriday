import React, {ChangeEvent, useState} from "react";
import style from "../SignIn/SignIn.module.css";
import {useDispatch} from "react-redux";
import {registerTC} from "./signup-reducer";
import {RegisterParamsType} from "../../api/api";

export const SignUp = () => {
  const dispatch = useDispatch()
  let [email, setEmail] = useState<string>("")
  let [password, setFirstPassword] = useState<string>("")
  let [secondPassword, setSecondPassword] = useState<string>("")

  const isEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const isFirstPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(e.currentTarget.value)
  }
  const isSecondPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.currentTarget.value)
  }

  const sendData = () => {
    debugger
    const data = {email, password}
    const setData = (data: RegisterParamsType) => {
      dispatch(registerTC(data))
    }
    setData(data)
  }


  return (
    <div className={style.container}>
      <h1>Sign Up</h1>
      <form>
        <label>
          <input type="text" name="text" value={email} onChange={isEmail}/>
        </label>
        <label>
          <input type="text" name="text" value={password}
                 onChange={isFirstPassword}/>
        </label>
        <label>
          <input type="text" name="text" value={secondPassword}
                 onChange={isSecondPassword}/>
        </label>
        <input type="submit" value="Sign Up" onSubmit={sendData}/>
      </form>
    </div>
  );
}