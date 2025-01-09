import { API_ROUTE } from "../configs/BASEURL";
import { instanceAxios } from "../contexts/instanceAxios";
import { getLocalUserData, setLocalUserData } from "../helpers/LocalStorage";
import { LOGIN_USER_API, REGISTER_USER_API } from "./typeForService/authType";

export const registerUserAPI = async (user:REGISTER_USER_API) => {
    try {
        const url = API_ROUTE.USERS + "/register";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("Đăng ký thất bại");
        }
        const data = await response.json();
        return data;
    } catch (error:any) {
        console.log("Error in registerUserAPI: ", error.message);
        throw error
    }
}


export const loginUserAPI = async (user:LOGIN_USER_API) => {
    try{
        const url = API_ROUTE.USERS + "/login";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Đăng nhập thất bại");
        }
        const data = await response.json();
        return data;
    } catch(error:any){
        console.log("Error in loginUserAPI: ", error.message);
        throw error
    }
}

export const logoutUserAPI = async () => {
    try {
        const {accessToken,refreshToken} = getLocalUserData();
        const url = API_ROUTE.USERS + "/logout";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            },
            body: JSON.stringify({refreshToken})
        });
        if (!response.ok) {
            throw new Error("Đăng xuất thất bại");
        }

        const data = await response.json();

        return data;
    } catch (error:any) {
        console.log("Error in logoutUserAPI: ", error.message);
        throw error
    }
}


export const getMeAPI = async () => {
   try{
    const {userData,accessToken} = getLocalUserData();
    if(userData){
        const url = `${API_ROUTE.USERS}/get-me`
        const response = await instanceAxios(url,{
            method:"GET",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":`Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) {
            throw new Error("Lấy dữ liệu của tôi thất bại");
        }

        const data = await response.data;
        return data;
    }
   }catch(error:any){
    console.log("Error in getMeUserAPI: ", error.message);
    throw error
   }
}

export const userVerifyMail = async (token:string) => {
   try {
    const url = `${API_ROUTE.USERS}/verify-email?token=${token}`
    const response = await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Xác thực email thất bại");
    }
    const data = await response.json();
    return data;
   } catch (error:any) {
    console.log("Error in userVerifyEmail: ", error.message);
    throw error
   }
}



export const forgotPasswordAPI = async (email:string) => {
    try {
        const url = `${API_ROUTE.USERS}/forgot-password`
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
            },
            body:JSON.stringify({email})
        });
        if (!response.ok) {
            throw new Error("Gửi Mail Quên Mật Khẩu thất bại");
        }
        const data = await response.json();
        return data;
    } catch (error:any) {
        console.log("Error in forgotPassword: ", error.message);
        throw error
    }
}


export const verifyResetPasswordAPI = async (token:string) => {
    try {
        const url = `${API_ROUTE.USERS}/reset-password?token=${token}`
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"Application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Xác thực Quên Mật Khẩu thất bại");
        }
        
        const data = await response.json();
        setLocalUserData(data.data.user_id,"","");
        return data;
    } catch (error:any) {
        console.log("Error in forgotPassword: ", error.message);
        throw error
    }
}



export const resetPasswordAPI = async ({password, confirmPassword}: {password: string, confirmPassword: string}) => {
    try {
        const url = `${API_ROUTE.USERS}/password`
        const {userData} = getLocalUserData();
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
            },
            body:JSON.stringify({
                password,
                confirmPassword,
                user_id: userData
            })
        });
        if (!response.ok) {
            throw new Error("Thay đổi Mật Khẩu thất bại");
        }
        
        const data = await response.json();
        return data;
    } catch (error:any) {
        console.log("Error in resetPassword: ", error.message);
        throw error
    }
}



export const getAuthGoogleUrl = () => {
    const oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
    console.log(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL)
    const params = {
        'client_id': String(process.env.REACT_APP_GOOGLE_CLIENT_ID),
        'redirect_uri':String(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL),
        'response_type': 'code',
        'scope': [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' '),
        'prompt':'consent',
        'access_type':'offline'
    };

    const paramsString = new URLSearchParams(params);

    return `${oauth2Endpoint}?${paramsString}`
}

