import React, { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainCourse from "../components/CourseMain/Main";
import MainCourseVer2 from "../components/CourseMain/MainVer2";
import { setLocalCourses } from "../helpers/LocalStorage";
import { useAuth } from "../contexts/AuthContext";

export type CourseContextType = {
  courseSlug: string;
  studentDetails: string[];
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

  useEffect(() => {
    if (courseData) {
      setLocalCourses(courseData);
    }
  }, [courseData]);

  const { user } = useAuth();

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
          isTeacher={isTeacher || true}
          courseData={courseData}
        />
      </CourseContext.Provider>
    </div>
  );
};

export default DetailCoursePage;
