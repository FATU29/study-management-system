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
import { useAuth } from "../contexts/AuthContext";

type MainContentProps = {
  currentSection: MenuSection;
};

const MainContent: React.FC<MainContentProps> = ({ currentSection }) => {
  switch (currentSection) {
    case "home":
      return <Main />;
    case "course":
      return <></>;
    case "chat":
      return <MessagePage />;
    case "file":
      return <></>;
    default:
      return <></>;
  }
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

  const [currentSection, setCurrentSection] = useState<MenuSection>("home");
  const {user} = useAuth();

  function handleSectionChange(section: MenuSection) {
    setCurrentSection(section);
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
      <NavbarHome user={user || undefined} />
      <div style={styles.content}>
        <MenuCourse onSectionChange={handleSectionChange} />
        <MainContent currentSection={currentSection} />
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
