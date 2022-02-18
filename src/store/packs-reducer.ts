import {setAppErrorAC} from "./app-reducer";
import {
  NewPackData,
  packsAPI,
  PacksPutType,
  PacksResponse
} from "../api/packs-api";
import {AppThunkType} from "./store";

export const initialState: PacksInitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  page: 1,
  pageCount: 10,
  cardsValuesFromRange: [0, 1000],
  sortPacks: '',
  searchField: '',
  myId: ''
}

export const PacksReducer = (state: PacksInitialStateType = initialState, action: PacksActionsType): PacksInitialStateType => {
  switch (action.type) {
    case 'packs/SET_PACKS':
    case 'packs/SET_PACKS_CURRENT_PAGE':
    case 'packs/SET_PACKS_FROM_RANGE':
    case 'packs/SET_PACKS_PAGE_COUNT':
    case 'packs/SET_PACKS_SEARCH_FIELD':
    case 'packs/SET_FILTER':
    case 'packs/SET_MY_ID':
      return {...state, ...action.payload}
    case 'packs/CLEAR_PACKS_DATA':
      return initialState
    default: {
      return state
    }
  }
}

// actions
export const setPacks = (payload: PacksResponse) => ({
  type: 'packs/SET_PACKS',
  payload
} as const)
export const setPacksCurrentPage = (page: number) => ({
  type: 'packs/SET_PACKS_CURRENT_PAGE',
  payload: {page}
} as const)
export const setPacksFromRange = (cardsValuesFromRange: number[]) => ({
  type: 'packs/SET_PACKS_FROM_RANGE',
  payload: {cardsValuesFromRange}
} as const)
export const setPacksPageCount = (pageCount: number) => ({
  type: 'packs/SET_PACKS_PAGE_COUNT',
  payload: {pageCount},
} as const)
export const setPacksSearchField = (searchField: string) => ({
  type: 'packs/SET_PACKS_SEARCH_FIELD',
  payload: {searchField},
} as const)
export const setPacksEmptyData = () => ({
  type: 'packs/CLEAR_PACKS_DATA'
} as const)
export const setPacksFilter = (sortPacks: string) => ({
  type: 'packs/SET_FILTER',
  payload: {sortPacks}
}) as const
export const setPacksMyId = (myId: string | null) => ({
  type: 'packs/SET_MY_ID',
  payload: {myId}
}) as const

// thunks
export const fetchPacks = (): AppThunkType => async (dispatch, getState) => {
  const packs = getState().packs
  try {
    const response = await packsAPI.getPacks({
      page: packs.page,
      pageCount: packs.pageCount,
      min: packs.cardsValuesFromRange[0],
      max: packs.cardsValuesFromRange[1],
      user_id: packs.myId,
      sortPacks: packs.sortPacks,
      packName: packs.searchField
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    dispatch(setAppErrorAC('Authentication server error'))
  }
}
export const createPack = (payload: NewPackData): AppThunkType => async dispatch => {
  try {
    await packsAPI.createPack(payload)
    await dispatch(fetchPacks())
  } catch (e) {
    dispatch(setAppErrorAC('You are not allowed to create pack!'))
  }
}
export const removePacks = (packId: string): AppThunkType => async dispatch => {
  try {
    await packsAPI.deletePacks(packId)
    await dispatch(fetchPacks())
  } catch (e) {
    dispatch(setAppErrorAC('You are not allowed to remove this pack!'))
  }
}
export const renamePacks = (payload: PacksPutType): AppThunkType => async dispatch => {
  try {
    await packsAPI.putPacks({...payload})
    await dispatch(fetchPacks())
  } catch
    (e) {
    dispatch(setAppErrorAC('You are not allowed to rename this pack!'))
  }
}

// types
export type PacksInitialStateType = PacksResponse & {
  cardsValuesFromRange: number[]
  sortPacks: string
  searchField: string
  myId: string | null
}

export type SetPacksActionType = ReturnType<typeof setPacks>
export type PacksActionsType =
   SetPacksActionType
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setPacksFromRange>
  | ReturnType<typeof setPacksEmptyData>
  | ReturnType<typeof setPacksPageCount>
  | ReturnType<typeof setPacksFilter>
  | ReturnType<typeof setPacksSearchField>
  | ReturnType<typeof setPacksMyId>