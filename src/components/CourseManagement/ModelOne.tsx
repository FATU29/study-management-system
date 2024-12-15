import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Typography, useTheme } from "@mui/material";
import IconifyIcon from "../utils/icon";
import { useQuery } from "@tanstack/react-query";
import {
  searchTeacherJoinCourse,
  searchTeacherNotJoinCourse,
  searchUsersNotJoinCourse,
} from "../../services/courses";
import useDebounce from "../../hooks/useDebounce";
import { toFullName } from "../../helpers/toFullName";

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  propKey?: string;
  courseId?: string;
  arrayData?: Array<any>;
  setArrayData?: React.Dispatch<React.SetStateAction<any[]>>;
}

const ModalOneComponent = ({
  propKey,
  open,
  setOpen,
  title,
  courseId,
  setArrayData,
}: TProps) => {
  const theme = useTheme();
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState<string>("");
  const deBounce = useDebounce(input, 600);


  const handleAPI = async () => {
    if (propKey === "add-teacher" || propKey === "Thêm giáo viên") {
      return searchTeacherNotJoinCourse(deBounce, courseId);
    } else if (propKey === "add-student" || propKey === "Thêm học sinh") {
      return searchUsersNotJoinCourse(deBounce, courseId);
    } else if (propKey === "Xóa giáo viên") {
      return searchTeacherJoinCourse(deBounce, courseId);
    } else if (propKey?.trim() === "Xóa học sinh") {
      return searchTeacherJoinCourse(deBounce, courseId);
    }
    return null;
  };

  const { data } = useQuery({
    queryKey: [propKey, deBounce],
    queryFn: async () => {
      const response = await handleAPI();
      return response.data;
    },
  });

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                mb: 3,
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                id="find-one-user-1"
                label="Tìm kiếm"
                onChange={(e) => setInput(e.target.value)}
              />
              {data?.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "white",
                    padding: 2,
                    boxShadow: 20,
                    borderRadius: "5px",
                    maxHeight: "15rem",
                    overflow: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {data?.length > 0 &&
                      data.map((item: any, index: number) => {
                        return (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 5,
                                "&:hover": {
                                  backgroundColor: theme.palette.grey[400],
                                },
                              }}
                              onClick={() => {
                                setArrayData &&
                                  setArrayData((oldData) => {
                                    const index = oldData.findIndex(
                                      (tmp) => tmp._id === item._id
                                    );
                                    if (index < 0) {
                                      const newData = [...oldData, item];
                                      return newData;
                                    }
                                    return oldData;
                                  });
                                handleClose();
                              }}
                              key={index}
                            >
                              <Typography>
                                {toFullName(item.firstName, item.lastName)}
                              </Typography>
                              <Typography>{item.email}</Typography>
                            </Box>
                          </>
                        );
                      })}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ModalOneComponent;
