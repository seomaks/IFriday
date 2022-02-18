import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  //baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

const messageForEmail: string = `<div style="background-color: lime; padding: 15px"> password recovery link:
                         <a href='https://seomaks.github.io/IFriday/#/set-pass/$token$'>
                         link</a></div>`

export const authAPI = {
  registration(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse>('auth/register', data);
  },
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data);
  },
  logout() {
    return instance.delete('auth/me');
  },
  me() {
    return instance.post('auth/me')
  },
  forgotPassword(email: string, from?: string) {
    const dataForSendLink = {
      email,
      from: from,
      message: messageForEmail
    }
    return instance.post<PasswordRecoveryParamsType, AxiosResponse<PasswordResponseType>>('auth/forgot', dataForSendLink)
  },
  recoverPassword(newPassword: string, resetPasswordToken: string) {
    return instance.post<NewPasswordParamsType, AxiosResponse<PasswordResponseType>>('auth/set-new-password', {password: newPassword,
      resetPasswordToken: resetPasswordToken
    })
  }
}

// types
export type ResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
}

export type PasswordResponseType = {
  info: string
  error: string
}

export type RegisterParamsType = {
  email: string
  password: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type NewPasswordParamsType = {
  password: string,
  resetPasswordToken: string
}

export type PasswordRecoveryParamsType = {
  email: string,
  from?: string,
  message: string
}