import React from "react";
import { useLocation } from "react-router-dom";
import MainCourse from "../components/CourseMain/Main";

const DetailCoursePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { name?: string; isTeacher?: boolean } || {};
  const { name = "Default Course Name", isTeacher = false } = state;

  return (
    <div className="min-h-100 bg-gray-100 w-100">
      <MainCourse name={name} isTeacher={isTeacher} />
    </div>
  );
};

export default DetailCoursePage;