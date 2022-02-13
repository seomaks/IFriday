import {signUpReducer} from "../features/SignUp/signup-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {loginReducer} from "../features/SignIn/login-reducer";
import {appReducer} from "../app/app-reducer";

let rootReducer = combineReducers({
  signUp: signUpReducer,
  signIn: loginReducer,
  app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;