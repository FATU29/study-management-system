import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  IconButton,
  TextField,
  Typography,
  useTheme,
  Checkbox,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import {
  searchTeacherJoinCourse,
  searchTeacherNotJoinCourse,
  searchUsersNotJoinCourse,
} from "../../services/courses";
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
  setArrayData?: React.Dispatch<React.SetStateAction<any[]>>;
  courseId?: string;
}

const ModalMultipleComponent = ({
  propKey,
  open,
  setOpen,
  title,
  setArrayData,
  courseId,
}: TProps) => {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const [input, setInput] = React.useState<string>("");
  const deBounce = useDebounce(input, 600);
  const [selectedUsers, setSelectedUsers] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleAPI = async () => {
    if (propKey === "add-teacher" || propKey === "Thêm giáo viên") {
      return searchTeacherNotJoinCourse(deBounce, courseId);
    } else if (propKey === "add-student" || propKey === "Thêm giáo viên") {
      return searchUsersNotJoinCourse(deBounce, courseId);
    } else if (propKey === "Xóa giáo viên") {
      return searchTeacherJoinCourse(deBounce, courseId);
    } else if (propKey?.trim() === "Xóa học sinh") {
      return searchTeacherJoinCourse(deBounce, courseId);
    }
    return null;
  
  };

  const { data } = useQuery({
    queryKey: [propKey + "multiple", deBounce],
    queryFn: async () => {
      const response = await handleAPI();
      return response.data;
    },
  });

  const handleCheckboxChange = (itemId: string) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSave = () => {
    if (setArrayData) {
      const selectedData = Object.keys(selectedUsers)
        .filter((key) => selectedUsers[key])
        .map((key) => data.find((item: any) => item._id === key));

      setArrayData((oldData) => [...oldData, ...selectedData]);
    }
    handleClose();
  };

  return (
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
              mb: 4,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              id="find-one-user-1"
              label="Tìm kiếm"
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              maxHeight: "15rem",
              overflowY: "auto",
              mb: 2,
              bgcolor: "white",
              borderRadius: "5px",
              boxShadow: 2,
            }}
          >
            {data?.map((item: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                  },
                }}
                key={item._id}
              >
                <Checkbox
                  checked={!!selectedUsers[item._id]}
                  onChange={() => handleCheckboxChange(item._id)}
                />
                <Typography>
                  {toFullName(item.firstName, item.lastName)}
                </Typography>
                <Typography>{item.email}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <IconButton onClick={handleSave} color="primary">
              <Typography variant="button">Lưu</Typography>
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMultipleComponent;
