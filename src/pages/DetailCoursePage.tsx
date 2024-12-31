import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainCourse from "../components/CourseMain/Main";
import MainCourseVer2 from "../components/CourseMain/MainVer2";
import { setLocalCourses } from "../helpers/LocalStorage";

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

  return (
    <div className="min-h-100 bg-gray-100 w-100">
      {/* <MainCourse name={name} isTeacher={isTeacher} courseData={courseData} /> */}
      <MainCourseVer2
        name={name}
        isTeacher={isTeacher || true}
        courseData={courseData}
      />
    </div>
  );
};

export default DetailCoursePage;
