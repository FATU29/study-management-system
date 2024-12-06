// import React, { /* useEffect, */ useState } from "react";

// import MainCourse from "../components/CourseMain/Main";
// import { MenuSection } from "../components/types/menu-section";
// import { useAuth } from "../contexts/AuthContext";
// import NavbarHome from "../components/CourseMain/NavBarHome";
// import MenuCourse from "../components/CourseMain/MenuCourse";
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
//         return <></>;
//       case "file":
//         return <></>;
//       default:
//         return <></>;
//     }
//   };

//   const CoursePage: React.FC = () => {

//     const [currentSection, setCurrentSection] = useState<MenuSection>("course");
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

//   export default CoursePage;
