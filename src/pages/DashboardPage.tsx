import React from "react";
import NavbarHome from "../components/Dashboard/NavbarHome";
import MenuCourse from "../components/Dashboard/MenuCourse";
// import { alpha } from "@mui/material/styles";

import { MenuSection } from "../components/types/menu-section";
import { Outlet, useNavigate } from "react-router-dom";

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
    name: "Phân tích thiết kế HTTT",
    icon: "fluent:class-20-regular",
    badge: 0,
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
    parentSectionId: null,
  },
];

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

  const navigate = useNavigate();

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
