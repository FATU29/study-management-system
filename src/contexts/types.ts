import { TUser } from "../types/userType"


export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
  }




export type AuthValuesType = {
    loadingInAuth: boolean
    user: TUser | null
    updateProfile: (userData: {
      firstName: string;
      lastName: string;
      dateOfBirth?: string;
      email: string;
    }) => Promise<void>
    setLoadingInAuth: (value: boolean) => void
    setUser: (value: TUser | null) => void
    logout: () => Promise<void>
    login: (params: LoginParams) => Promise<void>
  }
