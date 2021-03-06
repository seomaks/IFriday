import {authAPI, LoginParamsType} from "../api/api";
import {Dispatch} from "redux";
import {handlerAppError} from "../utilities/handlerAppError";

const initialState = {
  isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
      }
    catch(error)  {
      handlerAppError(error, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
  await authAPI.logout()
      dispatch(setIsLoggedInAC(false))
    }
    catch(error) {
        handlerAppError(error, dispatch)
    }
}

// types
type InitialStateType = typeof initialState
type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = SetIsLoggedInActionType
