import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import {Header} from "./features/Header/Header";
import {MainPage} from "./features/Main/MainPage";
import {SignIn} from "./features/SignIn/SignIn";
import {SignUp} from "./features/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="sign-in" element={<SignIn/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
      </Routes>
    </div>
  );
}

export default App;
