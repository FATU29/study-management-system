// import React, { /* useEffect, */ useState } from "react";

// import MainCourse from "../components/CourseMain/Main";
// import { MenuSection } from "../components/types/menu-section";
// import { useAuth } from "../contexts/AuthContext";
// import NavbarHome from "../components/CourseMain/NavBarHome";
// import MenuCourse from "../components/CourseMain/MenuCourse";
// import DashboardPage from "./DashboardPage";
// import MainDrive from "../components/Drive/Main";
// import { useNavigate } from "react-router-dom";
// import MessagePage from "./MessagePage";
// import Main from "../components/Dashboard/Main";

// type MainContentProps = {
//     currentSection: MenuSection;
//   };

//   const MainContent: React.FC<MainContentProps> = ({ currentSection }) => {
//     switch (currentSection) {
//       case "home":
//         return <Main />;
//       case "course":
//         return <MainCourse name="Course Name" />;
//       case "chat":
//         return <MessagePage/>;
//       case "file":
//         return <MainDrive/>;
//       default:
//         return <></>;
//     }
//   };

//   const DrivePage: React.FC = () => {

//     const [currentSection, setCurrentSection] = useState<MenuSection>("file");
//     const {user} = useAuth();

//     function handleSectionChange(section: MenuSection) {
//       setCurrentSection(section);
//     }

//     const styles = {
//       app: {
//         display: "flex",
//         flexDirection: "column" as const,
//         height: "100vh",
//       },
//       content: {
//         display: "flex",
//         flex: 1,
//         overflow: "hidden" as const, // Prevents entire page scrolling
//       },
//     };

//     return (

//       <div style={styles.app}>
//         <NavbarHome user={user || undefined} />
//         <div style={styles.content}>
//           <MenuCourse onSectionChange={handleSectionChange} />
//           <MainContent currentSection={currentSection} />
//           {/* <RightSidebar /> */}
//         </div>
//       </div>
//     );
//   };

//   export default DrivePage;
