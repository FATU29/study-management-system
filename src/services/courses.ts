import {API_ROUTE} from "../configs/BASEURL";

export const getCoursesAPI = async () => {
    try {
        const url = `${API_ROUTE.COURSES}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        if (data && data.data && Array.isArray(data.data.courses)) {
            return data.data.courses;
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error: any) {
        console.log("Error in getCoursesAPI: ", error.message);
        throw error;
    }
};