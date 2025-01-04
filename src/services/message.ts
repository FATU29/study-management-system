
import { API_ROUTE } from "../configs/BASEURL";
import { instanceAxios } from "../contexts/instanceAxios";
import { getLocalUserData } from "../helpers/LocalStorage";





const BASE_URL = API_ROUTE.MESSAGE

export const getMessageById = async ({
    receiverId,page = 1, perPage = 10
} : {
    receiverId: string,
    page:number,
    perPage:number
}) => {
    try {
        const url = BASE_URL + "/"
        const {accessToken} = getLocalUserData();
        const response = await instanceAxios(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${accessToken}`
            },
            params:{
                page,
                perPage,
                receiverId,
                
            }
        });

        return response.data

    } catch (error) {
        console.log("Error at getMessageById in services");
        throw(error)
    }
}


export const getAllUserMessage = async (content?:string) => {
    try {
        const url = BASE_URL + '/getReceiverId'
        const {accessToken} = getLocalUserData();

        const response = await instanceAxios(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${accessToken}`
            },
            params:{
                content
            }
        })

        return response.data

    } catch (error) {
        console.log("Error at getAllUserMessage")
        throw(error);
    }
}