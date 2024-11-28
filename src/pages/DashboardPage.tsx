import React, { /* useEffect, */ useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Box } from "@mui/material";
// import SideMenu from "../components/Dashboard/SideMenu";
// import NavigatorBar from "../components/Dashboard/NavigatorBar";
// import MainGrid from "../components/Dashboard/MainGrid";
import NavbarHome from "../components/Dashboard/NavbarHome";
import MenuCourse from "../components/Dashboard/MenuCourse";
import Main from "../components/Dashboard/Main";
import MessagePage from "./MessagePage";
// import { alpha } from "@mui/material/styles";

import { MenuSection } from "../components/types/menu-section";
import CourseClass from "../components/Dashboard/CourseClass";

// const MainContent: React.FC<MainContentProps> = ({ currentSection }) => {
//   switch (currentSection) {
//     case "home":
//       return <Main />;
//     case "course":
//       return <CourseClass courseName="Nhập môn CNPM" />;
//     case "chat":
//       return <MessagePage />;
//     case "file":
//       return <></>;
//     default:
//       return <></>;
//   }
// };

const initialSections: MenuSection[] = [
  {
    id: "home",
    name: "Trang chủ",
    icon: "solar:home-linear",
    badge: 0,
    component: <Main />,
    parentSectionId: null,
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
    component: <CourseClass courseName="Nhập môn CNPM" />,
    parentSectionId: "course",
  },
  {
    id: "course-1-edit",
    name: "Chỉnh sửa",
    icon: "fluent:class-20-regular",
    badge: 0,
    component: <CourseClass courseName="Edit course" />,
    parentSectionId: "course-1",
  },
  {
    id: "course-2",
    name: "Phân tích thiết kế HTTT",
    icon: "fluent:class-20-regular",
    badge: 0,
    component: <CourseClass courseName="Phân tích thiết kế HTTT" />,
    parentSectionId: "course",
  },
  {
    id: "chat",
    name: "Trò chuyện",
    icon: "proicons:chat",
    badge: 3,
    component: <MessagePage />,
    parentSectionId: null,
  },
  {
    id: "file",
    name: "Tệp riêng tư",
    icon: "formkit:file",
    badge: 0,
    component: <div>Tệp riêng tư content</div>,
    parentSectionId: null,
  },
];

const MainContent: React.FC<{
  currentSectionId: string;
  sections: MenuSection[];
}> = ({ currentSectionId, sections }) => {
  const section = sections.find((sec) => sec.id === currentSectionId);

  if (!section) {
    return <div>Section not found</div>;
  }

  return <>{section.component ?? null}</>;
};

const DashboardPage: React.FC = () => {
  // const navigate = useNavigate();
  // const [isScrolledOut, setIsScrolledOut] = useState(false);
  // const handleLoginClick = () => {
  //   navigate('/login');
  // };

  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       minHeight: '100vh',
  //       padding: 3,
  //     }}
  //   >
  //     <Typography variant="h2" component="h1" gutterBottom>
  //       Welcome to Our App
  //     </Typography>
  //     <Typography variant="h5" component="h2" gutterBottom>
  //       This is the modified home page of your application.
  //     </Typography>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       size="large"
  //       onClick={handleLoginClick}
  //       sx={{ marginTop: 4 }}
  //     >
  //       Go to Login
  //     </Button>
  //   </Box>
  // );
  // const [isScrolledOut, setIsScrolledOut] = useState(false);

  const [sections, setSections] = useState<MenuSection[]>(initialSections);
  const [currentSectionId, setCurrentSectionId] = useState<string>("home");

  function handleSectionChange(sectionId: string) {
    setCurrentSectionId(sectionId);
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
    // <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    //   { /* Box */ }
    //     { /* SideMenu */ }
    //     { /* AppNavbar */ }
    //     { /* Box */ }
    //       { /* Stack */ }
    //         { /* Header */ }
    //         { /* MainGrid */ }

    // { /* <Box component="replacing_div" sx={{ //CSS-like-style }}> BoxContent </Box>
    // sx: width, height, borderRadius, bgcolor

    // */ }
    //   <Header isScrolledOut={isScrolledOut} />
    //   <NavigatorBar />
    //     <Box sx={{ display: 'flex', flex: 1 }}>
    //         <SideMenu />
    //         <MainGrid />
    //     </Box>
    // </Box>
    <div style={styles.app}>
      <NavbarHome />
      <div style={styles.content}>
        <MenuCourse onSectionChange={handleSectionChange} sections={sections} />
        <MainContent currentSectionId={currentSectionId} sections={sections} />
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
