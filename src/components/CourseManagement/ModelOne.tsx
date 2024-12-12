import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, Typography } from "@mui/material";
import IconifyIcon from "../utils/icon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

interface TProps {
  open: boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  key?:string
}

const ModalOneComponent = ({ key,open, setOpen, title }: TProps) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:"flex", justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
              <IconifyIcon
                color="red"
                fontSize={"1.5rem"}
                icon={"streamline:delete-1-solid"}
              />
            </IconButton>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.5rem",
              letterSpacing: 2,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalOneComponent;
