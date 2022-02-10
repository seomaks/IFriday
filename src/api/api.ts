import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  registration(data: RegisterParamsType) {
     return instance.post<RegisterParamsType, AxiosResponse>('auth/register', data);
  }
}

// types
export type RegisterParamsType = {
    email: string
    password: string
}

//  login(email: string, password: string, rememberMe: boolean = false) {
//     return instance.post(`auth/login`, {email, password, rememberMe})
//   },

//     login(data: LoginParamsType) {
//         return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data);
//     },

//export type LoginParamsType = {
//     email: string
//     password: string
//     rememberMe?: boolean
//     captcha?: string
// }

//export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }