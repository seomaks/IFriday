import {AppStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FormEvent, useState} from "react";
import {createNewPasswordTC} from "../../store/password-reducer";
import {Navigate, useParams} from "react-router-dom";
import {ErrorType} from "../../store/app-reducer";
import style from "./Password.module.css";

export const SetNewPassword = () => {

  const disabledButton = useSelector<AppStateType, boolean>(state => state.password.disabledButton)
  const isSuccess = useSelector<AppStateType, boolean>(state => state.password.isSuccess)
  const isError = useSelector<AppStateType, ErrorType>(state => state.app.error)

  const [newPasswordField, setNewPasswordField1] = useState<string>('')


  const changeNewPasswordField = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPasswordField1(e.currentTarget.value)
  }

  const dispatch = useDispatch()
  const {token} = useParams<'token'>()

  const createNewPasswordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewPasswordTC(newPasswordField, token || ''))
    setNewPasswordField1('')
  }

  if (isSuccess) {
    return <Navigate to={'/success-recovery'}/>;
  }

  return (
    <div className={style.container}>
      <h1>Set new password</h1>
      <form name="form" onSubmit={createNewPasswordHandler}>
        <label>New password:
         <input type="password" title="Password" value={newPasswordField} onChange={changeNewPasswordField}/>
        </label>
      <p className={style.text}>Enter a new password and try not to forget it 😉</p>
      <button className={style.button} disabled={disabledButton}>Create a new password</button>
      </form>
      {isError && <div className={style.formSummaryError}>
        {isError}</div>}
    </div>
  )
}