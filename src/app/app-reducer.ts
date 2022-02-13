import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/SignIn/login-reducer";
import {authAPI, ResponseType} from "../api/api";

const initialState = {
  isInitialized: false,
  isData: {} as ResponseType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    case 'APP/GET-USER-DATA':
      return {...state, isData: action.data}
    default:
      return state
  }
}

// actions
export const setIsInitializedAC = (isInitialized: boolean) => ({
  type: 'APP/SET-IS-INITIALIZED',
  isInitialized
} as const)
export const getUserDataAC = (data: ResponseType) => ({
  type: 'APP/GET-USER-DATA',
  data
} as const)

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    dispatch(setIsLoggedInAC(true));
    dispatch(getUserDataAC(res.data))

  })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}

// types
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type GetUserDataActionType = ReturnType<typeof getUserDataAC>
export type AppActionsType = SetIsInitializedActionType | GetUserDataActionType
