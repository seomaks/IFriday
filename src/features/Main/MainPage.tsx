import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {ResponseType} from "../../api/api";

export const MainPage = () => {
  const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
  const userData = useSelector<AppStateType, ResponseType>(state => state.app.isData)

  if (!isInitialized) {
    return <Navigate to={"sign-in"}/>
  }

  return (
    <div>
      Yo! This is a main page!
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      <div>{userData.created}</div>
      <div>{userData.rememberMe}</div>
      <div>{userData.verified}</div>
    </div>
  );
}