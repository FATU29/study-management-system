import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IconifyIcon from "../utils/icon";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMessageById } from "../../services/message";
import { socket } from "../../helpers/socket";
import { toFullName } from "../../helpers/toFullName";
import EmojiPicker from "emoji-picker-react";

interface TProps {
  selectedUser: any;
}

const ChatDetailComponent = ({ selectedUser }: TProps) => {
  const theme = useTheme();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const { user } = useAuth();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const { data: messageData, isLoading } = useQuery({
    queryKey: ["messages", selectedUser?._id],
    queryFn: async () => {
      const response = await getMessageById({
        receiverId: selectedUser?._id,
        page: -1,
        perPage: -1,
      });
      return response;
    },
    enabled: !!user?._id && !!selectedUser?._id,
  });

  useEffect(() => {
    if (messageData) {
      setMessages(messageData?.data?.data);
    }
  }, [messageData]);

  useEffect(() => {
    const handleIncomingMessage = (data: any) => {
      const { content, from } = data;
      if (from === selectedUser?._id) {
        setMessages((prev: any) => [
          ...prev,
          {
            content,
            senderId: from,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    };

    socket.on("send-from-server", handleIncomingMessage);

    return () => {
      socket.off("send-from-server", handleIncomingMessage);
    };
  }, [selectedUser?._id]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    if (socket.connected) {
      socket.emit("send-from-client", {
        content,
        to: selectedUser?._id,
      });

      setMessages((prev: any) => [
        ...prev,
        {
          content,
          senderId: user?._id,
          timestamp: new Date().toISOString(),
        },
      ]);

      setText("");
    } else {
      console.error("Socket not connected");
    }
  };

  const isOwnMessage = (senderId: any) => senderId === user?._id;

  return (
    <>
      {!selectedUser ? (
        <>
          <Typography textAlign={"center"}>Vui lòng chọn đoạn tin</Typography>
        </>
      ) : (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "90%",
              height: "95%",
              marginTop: "2rem",
              gap: 2,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                height: "12%",
                width: "100%",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <Grid
                px={3}
                item
                xs={12}
                textAlign={"left"}
                alignContent={"center"}
              >
                <Typography variant="h6" component="div" fontWeight="bold">
                  {toFullName(selectedUser?.firstName, selectedUser?.lastName)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Online
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                height: "73%",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                overflowY: "auto",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: "90%",
                  margin: "0 auto",
                }}
              >
                {isLoading ? (
                  <Typography>Loading messages...</Typography>
                ) : (
                  messages?.map((message: any, index: any) => (
                    <Box
                      key={message._id || index}
                      sx={{
                        display: "flex",
                        justifyContent: isOwnMessage(message.senderId)
                          ? "flex-end"
                          : "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: isOwnMessage(message.senderId)
                              ? "right"
                              : "left",
                            fontSize: "0.8rem",
                          }}
                          component={"div"}
                        >
                          {isOwnMessage(message.senderId)
                            ? toFullName(
                                user?.firstName || "",
                                user?.lastName || ""
                              )
                            : toFullName(
                                selectedUser?.firstName || "",
                                selectedUser?.lastName || ""
                              )}
                        </Typography>
                        <Box
                          sx={{
                            padding: "20px",
                            backgroundColor: isOwnMessage(message.senderId)
                              ? theme.palette.primary.main
                              : theme.palette.grey[100],
                            maxWidth: "18rem",
                            borderRadius: "10px",
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                          }}
                        >
                          <Typography
                            sx={{
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              color: isOwnMessage(message.senderId)
                                ? "white"
                                : "inherit",
                              textAlign: "left",
                            }}
                          >
                            {message?.content}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ height: "15%" }}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  height: "80%",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                  }}
                >
                  <TextField
                    multiline
                    fullWidth
                    placeholder="Nhập tin nhắn"
                    minRows={1}
                    maxRows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.customColors.backgroundGrey,
                        minHeight: "50px",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(text);
                      }
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "20%",
                    display: "flex",
                    justifyContent: "space-between", 
                    alignItems: "center",
                    padding: "0.5rem",
                  }}
                >
                  <Tooltip title="Chọn emoji">
                    <Box sx={{ position: "relative" }}>
                      <IconButton onClick={toggleEmojiPicker}>
                        <IconifyIcon fontSize="1.8rem" icon="uil:smile" />
                      </IconButton>
                      {showEmojiPicker && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom:"140%",
                            right:"-100%",
                            zIndex: 10,
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "0.5rem",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <EmojiPicker onEmojiClick={(emoji) => setText((text) => text + emoji.emoji )} />
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                  <Tooltip title="Gửi">
                    <IconButton onClick={() => handleSendMessage(text)}>
                      <IconifyIcon fontSize="1.8rem" icon="iconamoon:send" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ChatDetailComponent;
