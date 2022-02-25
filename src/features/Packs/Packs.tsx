import React, {useCallback, useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash.debounce"
import style from "./Packs.module.css"
import { Navigate } from "react-router-dom";
import {
  createPack, fetchPacks,
  PacksInitialStateType,
  removePacks,
  renamePacks,
  setPacksCurrentPage,
  setPacksFilter,
  setPacksFromRange, setPacksMyId, setPacksPageCount,
  setPacksSearchField
} from "../../store/packs-reducer";
import {AppStateType} from "../../store/store";
import {logoutTC} from "../../store/login-reducer";
import {setIsMyIdAC, setIsPackListAC} from "../../store/app-reducer";
import {Profile} from "../Profile/Profile";
import {CheckBoxMyId} from "../../components/CheckMyBoxId/CheckMyBoxId";
import {PacksList} from "./PacksList";
import {PopUpAddPack} from "./PopAppAddPacks/PopUpAddPacks";
import {PacksTable} from "./PacksTable/PacksTable";
import {Pagination} from "../../components/Paginator/Paginator";
import {
  PageCountSelect
} from "../../components/PageCountSelect/PageCountSelect";

export const Packs = React.memo(() => {

  const dispatch = useDispatch()

  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
    sortPacks,
  } = useSelector<AppStateType, PacksInitialStateType>(state => state.packs)
  const isMyId = useSelector<AppStateType, boolean>(state => state.app.isMyID)
  const userId = useSelector<AppStateType, string>(state => state.app.isData._id)
  const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
  const profileOrPackList = useSelector<AppStateType, boolean>(state => state.app.isPackList)
  const name = useSelector<AppStateType, string>(state => state.app.isData.name)
  const avatar = useSelector<AppStateType, string | undefined>(state => state.app.isData.avatar)


  const handleLogOut = () => {
    dispatch(logoutTC())
  }
  const handleMyPacksAndProfile = () => {
    dispatch(setIsMyIdAC(true))
  }
  const setProfileOrPackList = useCallback((isPackList: boolean) => {
    dispatch(setIsPackListAC(isPackList))
  }, [dispatch])
  const handleIsMyIdToggle = useCallback((isMyId: boolean) => {
    dispatch(setIsMyIdAC(isMyId))
    dispatch(setPacksFromRange([0, 1000]))
    dispatch(setPacksSearchField(''))
  }, [dispatch])
  const handleRemovePacks = useCallback((PackId: string) => {
    dispatch(removePacks(PackId))
  }, [dispatch])
  const handleRenamePacks = useCallback((_id: string, name: string) => {
    dispatch(renamePacks({_id, name}))
  }, [dispatch])
  const handleSortPacks = useCallback((sortValue: string) => {
    dispatch(setPacksFilter(sortValue))
  }, [dispatch])
  const onPageChanged = useCallback((page: number) => {
    dispatch(setPacksCurrentPage(page))
  }, [dispatch])
  const setPageCount = useCallback((option: number) => {
    dispatch(setPacksPageCount(option))
  }, [dispatch])
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange(values))
  }, 400), [dispatch])
  const handleRangeChange = useCallback((values: number[]) => {
    debouncedFetchData(values)
  }, [debouncedFetchData])
  const addNewPack = useCallback((name: string) => {
    dispatch(createPack({cardsPack: {name}}))
  }, [dispatch])

  useEffect(() => {
    dispatch(setPacksMyId(isMyId ? userId : null))
    dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId, sortPacks])

  if (!isInitialized) return <Navigate to="/"/>

  return (
    <div className={style.packsWrapper}>
      <div className={style.packsHeader}>
        <CheckBoxMyId
          handleMyPacksAndProfile={handleMyPacksAndProfile}
          stateBoolean={profileOrPackList}
          setToggleState={setProfileOrPackList}
          name={['Packs list', 'Profile']}
          styleMyPacks={false}/>
      </div>
      <div className={style.packsContentWrapper}>
        {profileOrPackList
          ? <div className={style.sideBar}>
            <PacksList
              className={style.search}
              isMyId={isMyId}
              isMyIdToggle={handleIsMyIdToggle}
              cardsValuesFromRange={cardsValuesFromRange}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              handleRangeChange={handleRangeChange}/>
          </div>
          : <div className={style.sideBar}>
            <Profile
              className={style.search}
              cardsValuesFromRange={cardsValuesFromRange}
              logOut={handleLogOut}
              avatar={avatar}
              name={name}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              handleRangeChange={handleRangeChange}/>
          </div>}
        <div className={style.tableWrapper}>
          <PopUpAddPack
            logic={addNewPack}
            header={'Add New Pack'}/>
          <PacksTable
            packs={cardPacks}
            userId={userId}
            removePack={handleRemovePacks}
            renamePack={handleRenamePacks}
            sortItems={handleSortPacks}/>
          <Pagination
            totalRecords={cardPacksTotalCount}
            pageLimit={pageCount}
            pageNeighbours={3}
            currentPage={page}
            onPageChanged={onPageChanged}/>
          <PageCountSelect
            selectedPageCount={pageCount}
            options={[5, 10, 15]}
            changeOption={setPageCount}>
            packs
          </PageCountSelect>
        </div>
      </div>
    </div>
  )
})
