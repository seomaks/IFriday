import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./login-reducer";
import {authAPI, ResponseType} from "../api/api";
import {SetPacksActionType} from "./packs-reducer";

const initialState = {
  isInitialized: false,
  isData: {} as ResponseType,
  error: null as ErrorType
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
export type AppActionsType =
  SetIsInitializedActionType
  | GetUserDataActionType
  | SetAppErrorActionType
  | SetPacksActionType
export type ErrorType = string | null

