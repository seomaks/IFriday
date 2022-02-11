import {authAPI, LoginParamsType} from "../../api/api";
import {Dispatch} from "redux";
import {
  setSignUpErrorAC,
  SetSignUpErrorActionType
} from "../SignUp/signup-reducer";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

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
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI.login(data)
    .then(res => {
      dispatch(setIsLoggedInAC(true))
    })
    .catch((e: any) => {
      const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
      dispatch(setSignUpErrorAC(error))
    })
}

// types
type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionsType =
  SetIsLoggedInActionType
  | SetSignUpErrorActionType
