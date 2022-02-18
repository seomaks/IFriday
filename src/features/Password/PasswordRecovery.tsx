import {useDispatch, useSelector} from "react-redux";
import {passwordRecoveryTC} from "../../store/password-reducer";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../store/store";
import style from './Password.module.css'
import {ErrorType, setAppErrorAC} from "../../store/app-reducer";

export const PasswordRecovery = () => {

  const disabledButton = useSelector<AppStateType, boolean>(state => state.password.disabledButton)
  const isSuccess = useSelector<AppStateType, boolean>(state => state.password.isSuccess)
  const isError = useSelector<AppStateType, ErrorType>(state => state.app.error)

  const dispatch = useDispatch()


  const [emailAddressField, setEmailAddressField] = useState('')
  const changeEmailAddressField = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAddressField(e.currentTarget.value)
    dispatch(setAppErrorAC(''))
  }

  const sendEmailToServer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(passwordRecoveryTC(emailAddressField))
    setEmailAddressField('')
  }

  if (isSuccess) {
    return <Navigate to={`/transitional-page`}/>;
  }

  return (
    <div className={style.container}>
      <h1>Forgot your password?</h1>
      <form name="form" onSubmit={sendEmailToServer}>
        <label>e-mail:
      <input value={emailAddressField} onChange={changeEmailAddressField} />
        </label>
      <p className={style.text}>Write the email you used to register, please</p>
      <button className={style.button}  disabled={disabledButton}>Send</button>
      </form>
      {isError && <div className={style.formSummaryError}>
        {isError}
    </div>}
    </div>
  )
}