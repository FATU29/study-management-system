import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ModalOneComponent from "./ModelOne";
import ModalMultipleComponent from "./ModalMultipleComponent";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

interface TProps {
  title: string;
  propKey: string;
   setArrayData?: React.Dispatch<React.SetStateAction<any[]>>
  action?:string
  courseId?:string
}

const OptionsComponent = ({ action,title,propKey ,setArrayData,courseId}: TProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openOne, setOpenOne] = React.useState<boolean>(false);
  const [openMultiple, setOpenMultiple] = React.useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
     <ModalOneComponent courseId={courseId} setArrayData={setArrayData}  propKey={propKey} title={title} open={openOne} setOpen={setOpenOne}/>
     <ModalMultipleComponent courseId={courseId} setArrayData={setArrayData} propKey={propKey} title={title} open={openMultiple} setOpen={setOpenMultiple}/>
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
        >
          {title}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            setOpenOne(true);
            handleClose();
          }} disableRipple>
            {action}
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => {
             setOpenMultiple(true);
             handleClose();
          }} disableRipple>
            {action} nhiều
          </MenuItem>
        </StyledMenu>
      </div>
    </>
  );
};

export default OptionsComponent;
