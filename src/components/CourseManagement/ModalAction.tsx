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
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import OptionsComponent from "./OptionsComponent";
import { useState } from "react";
import { toFullName } from "../../helpers/toFullName";
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
interface TProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  propKey?: string;
  courseId?: string;
  action?:string;
  actionFn?: any;
}

const ModalActionComponent = ({
  propKey = "defaultTitle",
  open,
  setOpen,
  action,
  courseId,
  actionFn
}: TProps) => {
  const handleOnClose = () => setOpen(false);
  const [arrayId, setArrayId] = useState<Array<any>>([]);
  const query = useQueryClient();

  const {mutate} = useMutation({
    mutationKey:[action],
    mutationFn: async (arrayId:any) => {
      const arrayIds = arrayId.map((item:any) => item._id);
      await actionFn()(courseId,arrayIds);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["courses-table"] })
    }
  })

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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box>
                <OptionsComponent
                  setArrayData={setArrayId}
                  propKey={`${action} ${propKey}`}
                  title={`${action} ${propKey}`}
                  action={action}
                  courseId={courseId}
                />
                <List
                  dense={true}
                  sx={{
                    maxHeight: "8.5rem",
                    overflow: "auto",
                  }}
                >
                  {arrayId.map((dataItem, index) => {
                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              const filter = arrayId.filter(
                                (item) => item._id !== dataItem._id
                              );
                              setArrayId(filter);
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
                            dataItem.firstName,
                            dataItem.lastName
                          )}
                          secondary={dataItem.email ? "Secondary text" : null}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Button fullWidth onClick={() => {
                mutate(arrayId)
                setOpen(false)
              }} variant="contained">{action}</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalActionComponent;
