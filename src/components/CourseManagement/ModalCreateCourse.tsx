import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import OptionsComponent from "./OptionsComponent";
import { useState } from "react";
import { toFullName } from "../../helpers/toFullName";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { addCourse } from "../../services/courses";
import { slugify } from "../../utils/slugify";
import Spinner from "../../helpers/Spinner";

interface TProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:(options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

const ModalCreateCourseComponent = ({ open, setOpen,refetch }: TProps) => {
  const handleOnClose = () => setOpen(false);
  const [teacherId, setTeacherId] = useState<Array<any>>([]);
  const [enrollmentId, setEnrollmentId] = useState<Array<any>>([]);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");

  const {data,isPending,mutate} = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async () => {
      const teacherIds = teacherId.map((item) => item._id);
      const enrollmentIds = enrollmentId.map((item) => item._id);
      const slug = slugify(inputTitle);
      const course = {
        title:inputTitle,
        description: inputDescription,
        teacherIds: teacherIds,
        enrollmentIds: enrollmentIds,
        slug:slug
      }
      const response = await addCourse(course);
      return response.data;
    },
    onSuccess: () => {
        handleOnClose();
        refetch();
    }
  });

  return (
    <>
    {isPending && <Spinner/>}
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
                flexDirection: "column",
                gap:2
              }}
            >
              <TextField
                id="name-course"
                label="Tên khóa học"
                variant="outlined"
                placeholder="Nhập tên khóa học"
                fullWidth
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                onChange={(e) => setInputDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box>
                <OptionsComponent
                  setArrayData={setTeacherId}
                  propKey="add-teacher"
                  title="Thêm giáo viên"
                  action="Thêm"
                />
                <List
                  dense={true}
                  sx={{
                    maxHeight: "8.5rem",
                    overflow: "auto",
                  }}
                >
                  {teacherId.map((teacher, index) => {
                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              const filter = teacherId.filter(
                                (item) => item._id !== teacher._id
                              );
                              setTeacherId(filter);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <IconifyIcon
                              color="red"
                              fontSize={"1rem"}
                              icon={"icon-park-outline:delete"}
                            />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <IconifyIcon icon={"ooui:user-avatar-outline"} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={toFullName(
                            teacher.firstName || "",
                            teacher.lastName || ""
                          )}
                          secondary={teacher.email ? "Secondary text" : null}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box>
                <OptionsComponent
                  setArrayData={setTeacherId}
                  propKey="add-student"
                  title="Thêm học sinh"
                  action="Thêm"
                />
                <List
                  dense={true}
                  sx={{
                    maxHeight: "8.5rem",
                    overflow: "auto",
                  }}
                >
                  {enrollmentId.map((enrollment, index) => {
                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              const filter = enrollmentId.filter(
                                (item) => item._id !== enrollment._id
                              );
                              setEnrollmentId(filter);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <IconifyIcon
                              color="red"
                              fontSize={"1rem"}
                              icon={"icon-park-outline:delete"}
                            />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <IconifyIcon icon={"ooui:user-avatar-outline"} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={toFullName(
                            enrollment.firstName || "",
                            enrollment.lastName || ""
                          )}
                          secondary={enrollment.email ? "Secondary text" : null}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Button  onClick={() => {
                mutate();
            }} variant="contained" fullWidth>
              Thêm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalCreateCourseComponent;
