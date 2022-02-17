import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/Header/Header";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "./app-reducer";
import {Routing} from "../features/Routes/Routes";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])


  return (
    <div className="App">
      <Header/>
      <Routing />
    </div>
  );
}

export default App;
