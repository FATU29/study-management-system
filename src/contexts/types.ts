import { TUser } from "../types/userType"


export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
  }




export type AuthValuesType = {
    loadingInAuth: boolean
    user: TUser | null
    setLoadingInAuth: (value: boolean) => void
    setUser: (value: TUser | null) => void
    logout: () => Promise<void>
    login: (params: LoginParams) => Promise<void>
  }
