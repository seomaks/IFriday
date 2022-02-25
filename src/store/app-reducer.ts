import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./login-reducer";
import {authAPI, ResponseType} from "../api/api";
import {SetPacksActionType} from "./packs-reducer";
import {CardsActionsType} from "./cards-reducer";

const initialState = {
  isInitialized: false,
  isLoading: true,
  isData: {} as ResponseType,
  error: null as ErrorType,
  isMyID: false,
  isPackList: true
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    case 'app/GET-USER-DATA':
      return {...state, isData: action.data}
    case 'app/SET-ERROR':
      return {...state, error: action.error}
    case 'app/SET-IS-MY-ID':
      return {...state, isMyID: action.isMyId}
    case 'app/SET-IS-PACKLIST':
      return {...state, isPackList: action.isPackList}
    case 'app/SET-IS-LOADING':
      return {...state, isLoading: action.isLoading}
    default:
      return state
  }
}

// actions
export const setIsInitializedAC = (isInitialized: boolean) => ({
  type: 'app/SET-IS-INITIALIZED',
  isInitialized
} as const)
export const getUserDataAC = (data: ResponseType) => ({
  type: 'app/GET-USER-DATA',
  data
} as const)
export const setAppErrorAC = (error: ErrorType) => ({
  type: 'app/SET-ERROR',
  error
} as const)
export const setIsMyIdAC = (isMyId: boolean) => ({
  type: 'app/SET-IS-MY-ID',
  isMyId
} as const)
export const setIsPackListAC = (isPackList: boolean) => ({
  type: 'app/SET-IS-PACKLIST',
  isPackList
} as const)
export const setIsLoading = (isLoading: boolean) => ({
  type: 'app/SET-IS-LOADING',
  isLoading,
} as const)

// thunks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me()
    dispatch(setIsLoggedInAC(true));
    dispatch(getUserDataAC(res.data))
  } finally {
    dispatch(setIsInitializedAC(true))
  }
}

// types
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type GetUserDataActionType = ReturnType<typeof getUserDataAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsMyIdActionType = ReturnType<typeof setIsMyIdAC>
export type SetIsPackListActionType = ReturnType<typeof setIsPackListAC>
export type SetIsLoadingActionType = ReturnType<typeof setIsLoading>
export type AppActionsType =
  SetIsInitializedActionType
  | GetUserDataActionType
  | SetAppErrorActionType
  | SetPacksActionType
  | SetIsMyIdActionType
  | SetIsPackListActionType
  | SetIsLoadingActionType
  | CardsActionsType
export type ErrorType = string | null

