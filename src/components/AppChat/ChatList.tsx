import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import { useTheme } from "@mui/material/styles";
import { toFullName } from "../../helpers/toFullName";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getAllUserMessage } from "../../services/message";
import { socket } from "../../helpers/socket";

interface TProp {
  setSelectedUser: React.Dispatch<any>;
  selectedUser: any;
}

const ChatListComponent = ({  setSelectedUser, selectedUser }: TProp) => {
  const theme = useTheme();
  const [content,setContent] = useState<string>();
  const debounceVal = useDebounce(content);

  const users = useQuery({
    queryKey: ["user-chat", debounceVal], 
    queryFn: async () => {
      const response = await getAllUserMessage(debounceVal);
      return response?.data;
    },

  });

  


  const renderChatListData = () => {
    return users?.data?.map((item: any) => {
      return (
        <Grid
          key={item?._id}
          onClick={() => setSelectedUser(item)}
          container
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            bgcolor:
              selectedUser?._id === item._id
                ? theme.palette.primary.main
                : theme.palette.background.paper,
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey["400"],
              color: "black",
            },
            "&:active": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          }}
        >
          {/* <Grid item xs={3} alignItems={"center"} direction="row">
            <Avatar src={item?.avatar} />
          </Grid> */}

          <Grid item xs={9}>
            <Grid
              container
              direction="column"
              alignItems={"flex-start"}
              color="black"
            >
              <Grid item>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: selectedUser?._id === item._id ? "white" : "black",
                  }}
                >
                  {toFullName(item?.firstName, item?.lastName)}
                </Typography>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <Typography
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: "16rem",
                        fontSize: 15,
                        color:
                          selectedUser?._id === item._id ? "white" : "black",
                      }}
                    >
                      {item?.last_message}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color={theme.customColors.textGrey}>
                      {item?.timeOfLatestMessage}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item xs={2}>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "black",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Box>
                </Grid> */}
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              letterSpacing: "2px",
              fontWeight: "bold",
              marginBottom: "10px",
              alignSelf: "start",
            }}
            variant="h5"
            component="div"
          >
            Trò chuyện
          </Typography>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            id="input-with-icon-textfield"
            label="Tìm kiếm"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon
                      icon={"material-symbols:search"}
                      fontSize={"25px"}
                    />
                  </InputAdornment>
                ),
              },
            }}
            variant="standard"
          />
          <Typography alignSelf={"start"} variant="body2" component="div">
            Gần đây
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "32.5rem",
              gap: "5px",
              overflow: "auto",
              padding: "10px",
            }}
          >
            {renderChatListData()}
            
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ChatListComponent;
