import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {authAPI, ResponseType} from "../api/api";

const SET_ERROR = 'APP/SET-ERROR'
const GET_USER_DATA = 'APP/GET-USER-DATA'
const SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED'
const initialState = {
  isInitialized: false,
  isData: {} as ResponseType,
  error: null as ErrorType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case SET_IS_INITIALIZED:
      return {...state, isInitialized: action.isInitialized}
    case GET_USER_DATA:
      return {...state, isData: action.data}
    case SET_ERROR:
      return {...state, error: action.error}
    default:
      return state
  }
}

// actions
export const setIsInitializedAC = (isInitialized: boolean) => ({
  type: SET_IS_INITIALIZED,
  isInitialized
} as const)
export const getUserDataAC = (data: ResponseType) => ({
  type: GET_USER_DATA,
  data
} as const)
export const setAppErrorAC = (error: ErrorType) => ({
  type: SET_ERROR,
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
export type ErrorType = string | null

