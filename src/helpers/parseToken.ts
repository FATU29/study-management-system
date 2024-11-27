import { decodeToken } from "react-jwt";


export interface TParseToken{
    user_id?:string,
    exp?:number,
    iat?:number,
    role?:string,
    token_type?:number
}


export const parseToken = (token: string): TParseToken | undefined => {
    const payload = decodeToken(token);
    return payload as TParseToken;
}



