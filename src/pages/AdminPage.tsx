import React, { /* useEffect, */ useState } from "react";

import { MenuSection } from "../components/types/menu-section";
import { useAuth } from "../contexts/AuthContext";
import NavbarHome from "../components/AdminPanel/NavBarHome";
import MenuCourse from "../components/AdminPanel/MenuCourse";
import CourseAdminPanel from "../components/AdminPanel/CourseMain";
import StudentAdminPanel from "../components/AdminPanel/StudentMain";


type MainContentProps = {
    currentSection: MenuSection;
  };
  
  const MainContent: React.FC<MainContentProps> = ({ currentSection }) => {
    switch (currentSection.id) {
      case "course":
        return <CourseAdminPanel/>;
      case "student":
        return <StudentAdminPanel/>;
      default:
        return <></>;
    }
  };
  
  const AdminPage: React.FC = () => {
  
    const [currentSection, setCurrentSection] = useState<MenuSection>({
      id: "course",
      name: "Khóa học",
      parentSectionId: null,
    });
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
  
  export default AdminPage;
  