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
import MainCourse from "../components/CourseMain/Main";
import MainDrive from "../components/Drive/Main";

type MainContentProps = {
  currentSection: MenuSection;
};

const MainContent: React.FC<MainContentProps> = ({ currentSection }) => {
  switch (currentSection) {
    case "home":
      return <Main />;
    case "course":
      return <MainCourse name="Course Name" />;
    case "chat":
      return <MessagePage />;
    case "file":
      return <MainDrive/>
    default:
      return <></>;
  }
};

const DashboardPage: React.FC = () => {

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
