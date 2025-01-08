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

export const setLocalCourses = (userId: string, course?: { _id: string }) => {
    if (typeof window !== "undefined") {
        const key = `${TEMPORARY_COURSES}_${userId}`;
        const storedCourses = JSON.parse(window.localStorage.getItem(key) || "[]");

        if (course) {
            const courseExists = storedCourses.some((storedCourse: { _id: string }) => storedCourse._id === course._id);

            if (!courseExists) {
                storedCourses.push(course);

                if (storedCourses.length > 5) {
                    storedCourses.shift();
                }

                window.localStorage.setItem(key, JSON.stringify(storedCourses));
            }
        }

        return course;
    }
    return null;
};

export const getLocalCourses = (userId: string) => {
    if (typeof window !== "undefined") {
        const key = `${TEMPORARY_COURSES}_${userId}`;
        return JSON.parse(window.localStorage.getItem(key) || "[]");
    }
    return [];
};