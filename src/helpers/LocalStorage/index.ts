import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA, TEMPORARY_COURSES } from "../../configs/localStorageConfig";


export const setLocalUserData = (userData?: string, accessToken?: string, refreshToken?: string) => {
    if (typeof window !== "undefined") { 
        window.localStorage.setItem(USER_DATA, userData || "");
        window.localStorage.setItem(ACCESS_TOKEN, accessToken || "");
        window.localStorage.setItem(REFRESH_TOKEN, refreshToken || "");

        return {
            userData,
            accessToken,
            refreshToken
        };
    }

    return null; 
};

export const getLocalUserData = () => {
    if (typeof window !== "undefined") { 
        return {
            userData: window.localStorage.getItem(USER_DATA),
            accessToken: window.localStorage.getItem(ACCESS_TOKEN),
            refreshToken: window.localStorage.getItem(REFRESH_TOKEN)
        };
    }

    return {
        userData: null,
        accessToken: null,
        refreshToken: null
    }; 
};

export const clearLocalUserData = () => {
    if (typeof window !== "undefined") { 
        window.localStorage.removeItem(USER_DATA);
        window.localStorage.removeItem(ACCESS_TOKEN);
        window.localStorage.removeItem(REFRESH_TOKEN);
    }
};

export const setLocalCourses = (course?: { _id: string }) => {
    if (typeof window !== "undefined") {
        const storedCourses = JSON.parse(window.localStorage.getItem(TEMPORARY_COURSES) || "[]");

        if (course) {
            // Check if the course already exists in the array
            const courseExists = storedCourses.some((storedCourse: { _id: string }) => storedCourse._id === course._id);

            if (!courseExists) {
                // Add the new course to the array
                storedCourses.push(course);

                // If the number of courses exceeds 5, remove the oldest course
                if (storedCourses.length > 5) {
                    storedCourses.shift();
                }

                // Save the updated courses array to local storage
                window.localStorage.setItem(TEMPORARY_COURSES, JSON.stringify(storedCourses));
            }
        }

        return course;
    }
    return null;
};

export const getLocalCourses = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(window.localStorage.getItem(TEMPORARY_COURSES) || "[]");
    }
    return [];
};