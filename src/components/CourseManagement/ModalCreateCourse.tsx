import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import IconifyIcon from "../utils/icon";
import OptionsComponent from "./OptionsComponent";
import { useState } from "react";

interface TProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateCourseComponent = ({ open, setOpen }: TProps) => {
  const handleOnClose = () => setOpen(false);
  const [openModalAddOneEnrollemt, setOpenModalAddMultipleEnrollment] =
    useState<boolean>(false);

  return (
    <>
      <Modal open={open} onClose={handleOnClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
            backgroundColor: "white",
            color: "black",
            padding: "2rem 3.5rem",
            borderRadius: 1,
            boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton onClick={handleOnClose}>
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
                fontSize: "2rem",
                fontWeight: 500,
                letterSpacing: "5px",
              }}
            >
              Thêm khóa học
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                id="name-course"
                label="Tên khóa học"
                variant="outlined"
                placeholder="Nhập tên khóa học"
                fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <OptionsComponent key="add-teacher" title="Thêm giáo viên" />
              <OptionsComponent key="add-student" title="Thêm học sinh" />
            </Box>

            <Button variant="contained" fullWidth>Thêm</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalCreateCourseComponent;
