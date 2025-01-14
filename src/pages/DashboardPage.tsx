import React, { useEffect, useState } from "react";
import NavbarHome from "../components/Dashboard/NavbarHome";
import MenuCourse from "../components/Dashboard/MenuCourse";
import { MenuSection } from "../components/types/menu-section";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCoursesAPI, getCoursesByRoleAPI } from "../services/courses";
import { ROLE_TYPE } from "../types/roleType";

const initialSections: MenuSection[] = [
  {
    id: "home",
    name: "Trang chủ",
    icon: "solar:home-linear",
    badge: 0,
    url: "/home",
    parentSectionId: null,
  },
  // {
  //   id: "modal-test",
  //   name: "Modal test",
  //   icon: "solar:home-linear",
  //   badge: 0,
  //   url: "modal-test",
  //   parentSectionId: "home",
  // },
  {
    id: "course",
    name: "Khóa học",
    icon: "hugeicons:course",
    badge: 0, // Will be updated with actual course count
    parentSectionId: null,
  },
  {
    id: "chat",
    name: "Trò chuyện",
    icon: "proicons:chat",
    url: "message",
    badge:0,
    parentSectionId: null,
  },
  {
    id: "file",
    name: "Tệp riêng tư",
    icon: "formkit:file",
    badge: 0,
    url: "drive",
    parentSectionId: null,
  },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sections, setSections] = useState<MenuSection[]>(initialSections);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (user?._id) {
          console.log("user.role", user.role);
          // const response = await getCoursesAPI(user._id.toString());
          const response = await getCoursesByRoleAPI(
            user._id.toString(),
            user.role || ""
          );
          setCourses(response);

          const courseSections: MenuSection[] = response.map((course: any) => ({
            id: `course-${course._id}`,
            name: course.title,
            icon: "fluent:class-20-regular",
            badge: 0,
            url: `course/${course._id}`,
            parentSectionId: "course",
          }));

          // Update sections with dynamic courses
          setSections((prevSections) => {
            const sectionsWithoutCourses = prevSections.filter(
              (section) => section.parentSectionId !== "course"
            );

            const updatedSections = sectionsWithoutCourses.map((section) =>
              section.id === "course"
                ? { ...section, badge: response.length }
                : section
            );

            return [...updatedSections, ...courseSections];
          });
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?._id]);

  function handleSectionChange(section: MenuSection) {
    console.log("isTeacher: role=", user?.role);
    if (section.url) {
      const course = courses.find(
        (course) => `course-${course._id}` === section.id
      );
      navigate(section.url, {
        state: {
          name: section.name,
          // isTeacher: section.parentSectionId === "course" ? false : true,
          isTeacher: user?.role === ROLE_TYPE.TEACHER,
          courseData: course,
          userId: user?._id,
        },
      });
    }
  }

  const styles = {
    app: {
      display: "flex",
      flexDirection: "column" as const,
      height: "100vh",
    },
    content: {
      display: "flex",
      flex: 1,
      overflow: "hidden" as const, // Prevents entire page scrolling
    },
  };

  return (
    <div style={styles.app}>
      <NavbarHome user={user || undefined} />
      <div style={styles.content}>
        <MenuCourse onSectionChange={handleSectionChange} sections={sections} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
