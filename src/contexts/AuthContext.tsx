
import { TUser } from "../types/userType"
import { AuthValuesType, LoginParams } from "./types"
import { createContext, ReactNode, useState } from "react"



type Props = {
    children: ReactNode
}

const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
  }

const AuthContex = createContext(defaultProvider);



const AuthProvider = ({children} : Props) => {
    
    const [user,setUser] = useState<TUser | null>(defaultProvider.user);
    const [loading,setLoading] = useState<boolean>(defaultProvider.loading);


    const handleLogin = async (params: LoginParams) => {
        
    }

    const handleLogout = async () => {

    }


    const values : AuthValuesType = {
        user: user,
        setUser: setUser,
        loading: loading,
        setLoading: setLoading,
        login: handleLogin,
        logout:handleLogout
    }


    return <AuthContex.Provider value={values}>{children}</AuthContex.Provider>
}


export default AuthProvider;