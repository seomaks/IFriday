import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {handlerAppError} from "../utilities/handlerAppError";

const initialState = {
  disabledButton: false,
  isSuccess: false,
}

export const PasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "password/SET-BUTTON-CONDITION": {
      return {...state, disabledButton: action.isDisabled}
    }
    case "password/SET-SUCCESS": {
      return {...state, isSuccess: action.value}
    }
    default:
      return state;
  }
}

// actions
export const setButtonDisableAC = (isDisabled: boolean) => {
  return {
    type: 'password/SET-BUTTON-CONDITION',
    isDisabled: isDisabled
  } as const
}

export const setIsSuccessAC = (value: boolean) => {
  return {
    type: 'password/SET-SUCCESS',
    value: value
  } as const
}

//thunks
export const passwordRecoveryTC = (email: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setButtonDisableAC(true))
    authAPI.forgotPassword(email)
      .then((res) => {
        dispatch(setIsSuccessAC(true))
      })
      .catch(error => {
        handlerAppError(error, dispatch)
      })
      .finally(() => {
          dispatch(setButtonDisableAC(false))
        }
      )
  }
}

export const createNewPasswordTC = ( password: string, token: string) => {
  return (dispatch: Dispatch) => {
      dispatch(setButtonDisableAC(true))
      authAPI.recoverPassword(password, token)
        .then((res) => {
          dispatch(setButtonDisableAC(false))
          dispatch(setIsSuccessAC(true))
        })
        .catch((error: any) => {
          handlerAppError(error, dispatch)
          dispatch(setButtonDisableAC(false))
        })
  }
}

// types
type InitialStateType = typeof initialState
type SetIsSuccessActionType = ReturnType<typeof setIsSuccessAC>
type SetButtonConditionActionType = ReturnType<typeof setButtonDisableAC>

type ActionsType =
  | SetButtonConditionActionType
  | SetIsSuccessActionType
