import { API_ROUTE } from "../configs/BASEURL";
import { instanceAxios } from "../contexts/instanceAxios";
import { getLocalUserData } from "../helpers/LocalStorage";
import { COURSE } from "../types/courseType";

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


export const deleteSomeTeacherInCourse = async (courseId:string,ids:Array<string>) => {
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
}


export const deleteSomeEnrollmentsInCourse = async (courseId:string,ids:Array<string>) => {
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
}


export const deleteCourse = async (courseId:string) => {
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
        console.log('Error in deleteCourse');
        throw error;
    }
}


export const getCourse = async (slug:string) => {
    try {
        const url = API_ROUTE.COURSE + "/deleteCourse/" + slug;
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
        console.log('Error in getCourse');
        throw error;
    }
}