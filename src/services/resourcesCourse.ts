import { API_ROUTE } from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";

export const getResourcesAPI = async (slug: string) => {
    try {
        const url = `${API_ROUTE.COURSES}/${slug}/res`;
        const {accessToken} = getLocalUserData();

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.status !== 200) {
            throw new Error("Failed to fetch resources");
        }

        const data = await response.json();
        
        if (data && data.data && Array.isArray(data.data.resources)) {
            return data.data.resources; 
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in getResourcesAPI: ", error.message);
        throw error;
    }
};

export const addResourceAPI = async (slug: string, resourceInfo: any, title: string, resourceType: string, sectionLabel: string) => {
    try {
        const url = `${API_ROUTE.COURSES}/${slug}/res/add`;
        const {accessToken} = getLocalUserData();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, resourceType, resourceInfo, sectionLabel })
        });

        if (response.status !== 200) {
            throw new Error("Failed to add resource");
        }

        const data = await response.json();
        
        if (data && data.data && data.data.resource) {
            return data.data.resource; 
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in addResourceAPI: ", error.message);
        throw error;
    }
}

export const deleteResourceAPI = async (slug: string, resourceId: string) => {
    try {
        const url = `${API_ROUTE.COURSES}/${slug}/res/delete/${resourceId}`;
        const {accessToken} = getLocalUserData();

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.status !== 200) {
            throw new Error("Failed to delete resource");
        }

        const data = await response.json();
        
        if (data && data.data && data.data.resource) {
            return data.data.resource; 
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in deleteResourceAPI: ", error.message);
        throw error;
    }
}

export const updateResourceAPI = async (slug: string, resourceId: string, resource: any) => {
    try {
        const url = `${API_ROUTE.COURSES}/${slug}/res/update/${resourceId}`;
        const {accessToken} = getLocalUserData();

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resource)
        });

        if (response.status !== 200) {
            throw new Error("Failed to update resource");
        }

        const data = await response.json();
        
        if (data && data.data && data.data.resource) {
            return data.data.resource; 
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in updateResourceAPI: ", error.message);
        throw error;
    }
}