import {authAPI, RegisterParamsType} from "../api/api";
import {Dispatch} from "redux";
import {handlerAppError} from "../utilities/handlerAppError";

const initialState = {
  isRegistered: false,
}

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'signup/SET-IS-REGISTERED':
      return {...state, isRegistered: action.isRegistered}
    default:
      return state
  }
}

// actions
export const setIsRegisteredAC = (isRegistered: boolean) => ({
  type: 'signup/SET-IS-REGISTERED',
  isRegistered
} as const)

// thunks
export const registerTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
  try {
    await authAPI.registration(data)
    dispatch(setIsRegisteredAC(true));
  } catch (error) {
    handlerAppError(error, dispatch)
  }
}

// types
export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>
export type AppActionsType = SetIsRegisteredActionType
