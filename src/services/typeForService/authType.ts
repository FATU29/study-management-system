
export interface REGISTER_USER_API{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}



export interface LOGIN_USER_API{
    email:string,
    password:string,
}