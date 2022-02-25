import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {Registration} from "../Registration/Registration";
import React from "react";
import {PasswordRecovery} from "../Password/PasswordRecovery";
import {SuccessRecoveryPassword} from "../Password/SuccessRecoveryPassword";
import {SetNewPassword} from "../Password/SetNewPassword";
import {TransitionalPage} from "../Password/TransitionalPage";
import {Packs} from "../Packs/Packs";

export const Routing = () => {
  return (
    <Routes>
      <Route path="profile" element={<Packs/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="sign-up" element={<Registration/>}/>
      <Route path="sign-in" element={<Login/>}/>
      <Route path="packs" element={<Packs/>}/>
      <Route path="pass-recovery" element={<PasswordRecovery/>}/>
      <Route path="transitional-page" element={<TransitionalPage/>}/>
      <Route path="set-pass/:token" element={<SetNewPassword/>}/>
      <Route path="success-recovery" element={<SuccessRecoveryPassword/>}/>
      <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
      <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>
  )
}



