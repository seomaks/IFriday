import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  registration(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse>('auth/register', data);
  },
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data);
  },
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

export type RegisterParamsType = {
  email: string
  password: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
