import {registrationReducer} from "./registration-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {loginReducer} from "./login-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {PasswordReducer} from "./password-reducer";
import {PacksReducer} from "./packs-reducer";

let rootReducer = combineReducers({
  signUp: registrationReducer,
  signIn: loginReducer,
  app: appReducer,
  password: PasswordReducer,
  packs: PacksReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store;