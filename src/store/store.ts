import {registrationReducer} from "../features/Registration/registration-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {loginReducer} from "../features/Login/login-reducer";
import {appReducer} from "../app/app-reducer";
import {PasswordReducer} from "../features/Password/password-reducer";

let rootReducer = combineReducers({
  signUp: registrationReducer,
  signIn: loginReducer,
  app: appReducer,
  password: PasswordReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;