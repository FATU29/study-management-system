import {API_ROUTE} from "../configs/BASEURL";
import { getLocalUserData } from "../helpers/LocalStorage";

export const getCoursesAPI = async (enrollmentId: string) => {
    try {
        const url = `${API_ROUTE.COURSES}/getCourseForStudent/${enrollmentId}`;
        const {accessToken} = getLocalUserData();
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }        
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.status === 200 && Array.isArray(data.courses)) {
            return data.courses;
        } else {
            console.log("Unexpected response format:", data);
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in getCoursesAPI: ", error.message);
        throw error;
    }
};