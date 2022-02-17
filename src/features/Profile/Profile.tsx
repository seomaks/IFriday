import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {ResponseType} from "../../api/api";
import {logoutTC} from "../Login/login-reducer";
import Preloader from "../../components/common/Preloader";

export const Profile = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
  const userData = useSelector<AppStateType, ResponseType>(state => state.app.isData)
  const isLoggedIn = useSelector<AppStateType, boolean>(state => state.signIn.isLoggedIn)

  const logoutHandler = () => {dispatch(logoutTC())}

  if (!isInitialized || !isLoggedIn) {
    return <Navigate to={"sign-in"}/>
  }

  if (!isInitialized) {
    return <div className="preload">
      <Preloader/>
    </div>
  }

  return (
    <div>
      Yo! This is a main page!
      <div>{userData.avatar}</div>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      <div>{userData.created}</div>
      <div>{userData.rememberMe}</div>
      <div>{userData.verified}</div>
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
}