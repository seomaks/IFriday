import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "../Main/MainPage";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import React from "react";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="sign-in" element={<Login/>}/>
      <Route path="sign-up" element={<Registration/>}/>
      <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
      <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>
  )
}
