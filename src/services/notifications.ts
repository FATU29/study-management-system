
import { API_ROUTE } from "../configs/BASEURL";
import { instanceAxios } from "../contexts/instanceAxios";
import { getLocalUserData, setLocalUserData } from "../helpers/LocalStorage";
import { NOTIFICATIONS_API } from "./typeForService/notiType";


export const getNotificationsAPI = async (idUser: string) => {
    try {
        const url = `${API_ROUTE.NOTIFICATIONS}/${idUser}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        
        if (data && data.data && Array.isArray(data.data.notifications)) {
            return data.data.notifications; 
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in getNotificationsAPI: ", error.message);
        throw error;
    }
};



export const markAsReadAPI = async (id: string) => {
    try {
        const url = `${API_ROUTE.NOTIFICATIONS}/${id}`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to mark notification as read");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in markAsReadAPI: ", error.message);
        throw error;
    }
}

export const deleteNotificationAPI = async (id: string) => {
    try {
        const url = `${API_ROUTE.NOTIFICATIONS}/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to delete notification");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in deleteNotificationAPI: ", error.message);
        throw error;
    }
}