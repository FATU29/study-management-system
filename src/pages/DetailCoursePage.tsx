import React, { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainCourse from "../components/CourseMain/Main";
import MainCourseVer2 from "../components/CourseMain/MainVer2";
import { setLocalCourses } from "../helpers/LocalStorage";
import { useAuth } from "../contexts/AuthContext";

export type StudentDetailType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type CourseContextType = {
  courseSlug: string;
  studentDetails: StudentDetailType[];
  currentUserId: string;
  currentUserRole: string;
};

export const CourseContext = createContext<CourseContextType>({
  courseSlug: "",
  studentDetails: [],
  currentUserId: "",
  currentUserRole: "",
});

const DetailCoursePage: React.FC = () => {
  const location = useLocation();
  const state =
    (location.state as {
      name?: string;
      isTeacher?: boolean;
      courseData?: any;
    }) || {};
  const { name = "Default Course Name", isTeacher = false, courseData } = state;
  const { user } = useAuth();

  useEffect(() => {
    if (courseData && user?._id) {
      setLocalCourses(user._id.toString(), courseData);
    }
  }, [courseData]);

  return (
    <div className="min-h-100 bg-gray-100 w-100">
      {/* <MainCourse name={name} isTeacher={isTeacher} courseData={courseData} /> */}
      <CourseContext.Provider
        value={{
          courseSlug: courseData?.slug || "",
          studentDetails: courseData?.studentDetails || [],
          currentUserId: user?._id?.toString() || "",
          currentUserRole: user?.role || "",
        }}
      >
        <MainCourseVer2
          name={name}
          isTeacher={isTeacher}
          courseData={courseData}
        />
      </CourseContext.Provider>
    </div>
  );
};

export default DetailCoursePage;
