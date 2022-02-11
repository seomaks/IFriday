import {authAPI, RegisterParamsType} from "../../api/api";
import {Dispatch} from "redux";


const initialState = {
  isRegistered: false,
  error: null as ErrorType
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'SIGNUP/SET-IS-REGISTERED':
      return {...state, isRegistered: action.isRegistered}
    case "SIGNUP/SET-ERROR":
      return {...state, error: action.error}
    default:
      return state
  }
}

// actions
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SIGNUP/SET-IS-REGISTERED', isRegistered} as const)
export const setSignUpErrorAC = (error: ErrorType) => ({type: 'SIGNUP/SET-ERROR', error} as const)

// thunks
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
  authAPI.registration(data).then(res => {
      dispatch(setIsRegisteredAC(true));
      console.log("Registration was success ")
    })
    .catch((e: any) => {
      const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
      dispatch(setSignUpErrorAC(error))
    })
}


// types
export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>
export type SetSignUpErrorActionType = ReturnType<typeof setSignUpErrorAC>
export type AppActionsType = SetIsRegisteredActionType | SetSignUpErrorActionType
export type ErrorType = string | null