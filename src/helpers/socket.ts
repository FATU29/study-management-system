import io from "socket.io-client";
import { getLocalUserData } from "./LocalStorage";

const BASE_URL_BE = String(process.env.REACT_APP_BASE_URL);

export const socket = io(BASE_URL_BE ,{
    auth:{ accessToken: getLocalUserData().accessToken 
    }
});