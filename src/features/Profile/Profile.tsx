import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {logoutTC} from "../../store/login-reducer";
import Preloader from "../../components/common/Preloader";
import style from "./Profile.module.css"
import {Button} from "../../components/Button/Button";
import {RangeContainer} from "../Packs/RangeContainer/RangeContainer";
import {Search} from "../../components/Search/Search";
import {fetchPacks} from "../../store/packs-reducer";

type ProfilePropsType = {
  cardsValuesFromRange: number[]
  logOut: () => void
  avatar: string | undefined
  name: string
  minCardsCount: number
  maxCardsCount: number
  handleRangeChange: (values: number[]) => void
  className: string
}

export const Profile = ({
                          className,
                          minCardsCount,
                          maxCardsCount,
                          handleRangeChange,
                          name,
                          avatar,
                          logOut,
                          cardsValuesFromRange,
                        }: ProfilePropsType) => {
  const dispatch = useDispatch()
  const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
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
    <div className={style.profileWrapper}>
      <div>
        <img src={avatar} alt="avatar" width='96px'/>
      </div>
      <span>{name}</span>
      <Button padding={'23px'} onClick={logoutHandler}>Log Out</Button>
      <RangeContainer
        cardsValuesFromRange={cardsValuesFromRange}
        minCardsCount={minCardsCount}
        maxCardsCount={maxCardsCount}
        handleRangeChange={handleRangeChange}/>
      <br/>
      <Search
        fetchData={fetchPacks}
        className={className}
      />
    </div>
  );
}