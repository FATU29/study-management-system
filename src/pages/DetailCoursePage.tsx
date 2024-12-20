import React from "react";
import { useLocation } from "react-router-dom";
import MainCourse from "../components/CourseMain/Main";

const DetailCoursePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { name?: string; isAdmin?: boolean } || {};
  const { name = "Default Course Name", isAdmin = false } = state;

  return (
    <div className="min-h-screen bg-gray-100">
      <MainCourse name={name} isTeacher={isAdmin} />
    </div>
  );
};

export default DetailCoursePage;