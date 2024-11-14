// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Avatar from "@mui/material/Avatar";
// import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

// import IconifyIcon from "../utils/icon/index";

// // May be unused
// const mainListItems = [
//   {
//     icon: <IconifyIcon icon="material-symbols:home" />,
//     text: "Trang chủ",
//   },
//   {
//     icon: <IconifyIcon icon="mdi:school-outline" />,
//     text: "Khóa học",
//   },
//   {
//     icon: <IconifyIcon icon="mdi:chat-outline" />,
//     text: "Trò chuyện",
//   },
//   {
//     icon: <IconifyIcon icon="mdi:file-outline" />,
//     text: "Tệp riêng tư",
//   },
// ];

// const secondaryListItems: { icon: JSX.Element; text: string }[] = [];

// const MenuContent = () => {
//   return (
//     <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
//       <List dense>
//         {mainListItems.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{ display: "block" }}>
//             <ListItemButton selected={index === 0}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <List dense>
//         {secondaryListItems.map((item, index) => (
//           <ListItem key={index} disablePadding sx={{ display: "block" }}>
//             <ListItemButton>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Stack>
//   );
// };

// const drawerWidth = 240;

// const Drawer = styled(MuiDrawer)({
//   width: drawerWidth,
//   flexShrink: 0,
//   boxSizing: "border-box",
//   mt: 10,
//   [`& .${drawerClasses.paper}`]: {
//     width: drawerWidth,
//     boxSizing: "border-box",
//   },
// });

// const SideMenu: React.FC = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         display: { xs: "none", md: "block" },
//         [`& .${drawerClasses.paper}`]: {
//           backgroundColor: "background.paper",
//         },
//       }}
//     >
//       {/*
//   Drawer
//       // Box
//       //     SelectContent
//       // Divider
//       MenuContent
//   */}

//       <MenuContent />
//     </Drawer>
//   );
// };

// export default SideMenu;
