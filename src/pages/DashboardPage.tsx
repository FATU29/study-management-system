import React from "react";
import NavbarHome from "../components/Dashboard/NavbarHome";
import MenuCourse from "../components/Dashboard/MenuCourse";
import { MenuSection } from "../components/types/menu-section";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const initialSections: MenuSection[] = [
  {
    id: "home",
    name: "Trang chủ",
    icon: "solar:home-linear",
    badge: 0,
    url: "/home",
    parentSectionId: null,
  },
  {
    id: "modal-test",
    name: "Modal test",
    icon: "solar:home-linear",
    badge: 0,
    url: "modal-test",
    parentSectionId: "home",
  },
  {
    id: "course",
    name: "Khóa học",
    icon: "hugeicons:course",
    badge: 2,
    parentSectionId: null,
  },
  {
    id: "course-1",
    name: "Nhập môn CNPM",
    icon: "fluent:class-20-regular",
    badge: 0,
    // url: "course/cs101",
    url: "course/?classId=cs101",
    parentSectionId: "course",
  },
  {
    id: "course-1-edit",
    name: "Chỉnh sửa (for illustration use only)",
    icon: "fluent:class-20-regular",
    badge: 0,
    parentSectionId: "course-1",
  },
  {
    id: "course-2",
    name: "Lớp của Anh Trực",
    icon: "fluent:class-20-regular",
    badge: 0,
    url: "/home/course-ver-2",
    parentSectionId: "course",
  },
  {
    id: "chat",
    name: "Trò chuyện",
    icon: "proicons:chat",
    badge: 3,
    url: "message",
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

  function handleSectionChange(section: MenuSection) {
    if (section.url) {
      navigate(section.url);
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
        <MenuCourse
          onSectionChange={handleSectionChange}
          sections={initialSections}
        />
        <Outlet />
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
