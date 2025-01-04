import { API_ROUTE } from "../configs/BASEURL";
import { instanceAxios } from "../contexts/instanceAxios";
import { getLocalUserData } from "../helpers/LocalStorage";
import { COURSE } from "../types/courseType";

export const getCoursesAPI = async (enrollmentId: string) => {
  try {
    const url = `${API_ROUTE.COURSES}/getCourseForStudent/${enrollmentId}`;
    const { accessToken } = getLocalUserData();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses: ${response.status} ${response.statusText}`
      );
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

export const getCourses = async (page: number = 1, perPage: number = 10) => {
  try {
    const { accessToken } = getLocalUserData();
    const url = API_ROUTE.COURSE;
    const response = await instanceAxios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in courses");
    throw error;
  }
};

export const addCourse = async (course: COURSE) => {
  try {
    const { accessToken } = getLocalUserData();
    const url = API_ROUTE.COURSE + "/add";
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: course,
    });

    return response.data;
  } catch (error) {
    console.log("Error in addCourse");
    throw error;
  }
};

export const addEnrollmentInCourse = async (
  courseId: string,
  enrollmentId: string
) => {
  try {
    const { accessToken } = getLocalUserData();
    const url = API_ROUTE.COURSE + "/addEnrollmentInCourse";
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        enrollmentId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error addEnrollmentInCourse");
    throw error;
  }
};

export const addSomeEnrollmentsInCourse = async (
  courseId: string,
  ids: Array<string>
) => {
  try {
    const url = API_ROUTE.COURSE + "/addSomeEnrollmentsInCourse";
    const { accessToken } = getLocalUserData();
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        enrollmentIds: ids,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in addSomeEnrollmentsInCourse");
    throw error;
  }
};

export const addTeacherInCourse = async (
  courseId: string,
  teacherId: string
) => {
  try {
    const { accessToken } = getLocalUserData();
    const url = API_ROUTE.COURSE + "/addTeacherInCourse";
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        teacherId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in addTeacherInCourse");
    throw error;
  }
};

export const addSomeTeachersInCourse = async (
  courseId: string,
  ids: Array<string>
) => {
  try {
    const url = API_ROUTE.COURSE + "/addSomeTeachersInCourse";
    const { accessToken } = getLocalUserData();
    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        teacherIds: ids,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in addSomeTeachersInCoure");
    throw error;
  }
};

export const deleteTeacherInCourse = async (courseId: string, id: string) => {
  try {
    const url = API_ROUTE.COURSE + "/deleteTeacherInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        teacherId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteTeacherInCourse");
    throw error;
  }
};

export const deleteEnrollmentInCourse = async (
  courseId: string,
  id: string
) => {
  try {
    const url = API_ROUTE.COURSE + "/deleteEnrollmentInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        enrollmentId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteEnrollmentInCourse");
    throw error;
  }
};

export const deleteSomeTeacherInCourse = async (
  courseId: string,
  ids: Array<string>
) => {
  try {
    const url = API_ROUTE.COURSE + "/deleteSomeTeacherInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        teacherIds: ids,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteSomeTeacherInCourse");
    throw error;
  }
};

export const deleteSomeEnrollmentsInCourse = async (
  courseId: string,
  ids: Array<string>
) => {
  try {
    const url = API_ROUTE.COURSE + "/deleteSomeEnrollmentsInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
        enrollmentIds: ids,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error in deleteSomeEnrollmentsInCourse");
    throw error;
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    const url = API_ROUTE.COURSE + "/deleteCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        courseId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in deleteCourse");
    throw error;
  }
};

export const getCourse = async (slug: string) => {
  try {
    const url = API_ROUTE.COURSE + "/" + slug;
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in getCourse");
    throw error;
  }
};

export const searchTeacherNotJoinCourse = async (
  content: string,
  courseId?: string
) => {
  try {
    const url = API_ROUTE.SEARCH_IN_COURSE + "/teachers";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content: content,
        courseId: courseId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in searchTeacherNotJoinCourse");
    throw error;
  }
};

export const searchUsersNotJoinCourse = async (
  content: string,
  courseId?: string
) => {
  try {
    const url = API_ROUTE.SEARCH_IN_COURSE + "/users";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content: content,
        courseId: courseId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in searchUsersNotJoinCourse");
    throw error;
  }
};

export const searchTeacherJoinCourse = async (
  content: string,
  courseId?: string
) => {
  try {
    const url = API_ROUTE.SEARCH_IN_COURSE + "/teachersInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content: content,
        courseId: courseId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in searchTeacherJoinCourse");
    throw error;
  }
};

export const usersInCourse = async (content: string, courseId?: string) => {
  try {
    const url = API_ROUTE.SEARCH_IN_COURSE + "/usersInCourse";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content: content,
        courseId: courseId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in usersInCourse");
    throw error;
  }
};

export const searchCourse = async (
  content: string,
  page: number = 1,
  perPage: number = 5
) => {
  try {
    const url = API_ROUTE.SEARCH_IN_COURSE + "/courses";
    const { accessToken } = getLocalUserData();

    const response = await instanceAxios(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        content: content,
      },
      params: {
        page,
        perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in usersInCourse");
    throw error;
  }
};
