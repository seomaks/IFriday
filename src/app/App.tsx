import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../features/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../store/app-reducer";
import {Routing} from "../features/Routes/Routes";
import {AppStateType} from "../store/store";
import Preloader from "../components/common/Preloader";

function App() {
  const dispatch = useDispatch()
  const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialized) {
    return <div className="preload">
      <Preloader/>
    </div>
  }

  return (
    <div className="App">
      <Header/>
      <Routing />
    </div>
  );
}

export default App;
