import { API_ROUTE } from "../configs/BASEURL";
import {getLocalUserData} from "../helpers/LocalStorage";

export const getFileAPI = async (fileId: string) => {
    try {
        const url = `${API_ROUTE.FILES}/download`;
        const {accessToken} = getLocalUserData();
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch file");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in getFileAPI: ", error.message);
        throw error;
    }
}

export const addFileAPI = async (file: any) => {
    try {
        const url = `${API_ROUTE.FILES}/upload`;
        const {accessToken} = getLocalUserData();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(file)
        });
        if (!response.ok) {
            throw new Error("Failed to add file");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in addFileAPI: ", error.message);
        throw error;
    }
}

export const getLimitsAPI = async () => {
    try {
        const url = `${API_ROUTE.FILES}/limits`;
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch limits");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in getLimitsAPI: ", error.message);
        throw error;
    }
}

export const getPersonalFilesAPI = async (sourceId: string) => {
    try {
        const url = `${API_ROUTE.FILES}/personal/${sourceId}`;
        const {accessToken} = getLocalUserData();
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch personal files");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in getPersonalFilesAPI: ", error.message);
        throw error;
    }
}

export const deleteFileAPI = async (fileId: string) => {
    try {
        const url = `${API_ROUTE.FILES}/delete`;
        const {accessToken} = getLocalUserData();
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({fileId})
        });
        if (!response.ok) {
            throw new Error("Failed to delete file");
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log("Error in deleteFileAPI: ", error.message);
        throw error;
    }
}