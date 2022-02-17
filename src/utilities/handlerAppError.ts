import {Dispatch} from "redux";
import {setAppErrorAC} from "../app/app-reducer";

export const handlerAppError = (err: any, dispatch: Dispatch) => {
  const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
  dispatch(setAppErrorAC(error));
};