import {authAPI, RegisterParamsType} from "../../api/api";
import {Dispatch} from "redux";


const initialState = {
  isRegistered: false
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'SIGNUP/SET-IS-REGISTERED':
      return {...state, isRegistered: action.isRegistered}
    default:
      return state
  }
}

// actions
export const setIsRegisteredAC = (isRegistered: boolean) => ({type: 'SIGNUP/SET-IS-REGISTERED', isRegistered} as const)

// thunks
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
  authAPI.registration(data).then(res => {
      dispatch(setIsRegisteredAC(true));
    })
    .catch((e: any) => {
      const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
      console.log('Error: ', error)
    })
}


// types
export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>
export type AppActionsType = SetIsRegisteredActionType
