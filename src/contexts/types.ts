import { TUser } from "../types/userType"


export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
  }




export type AuthValuesType = {
    loading: boolean
    logout: () => void
    user: TUser | null
    setLoading: (value: boolean) => void
    setUser: (value: TUser | null) => void
    login: (params: LoginParams) => void
  }
