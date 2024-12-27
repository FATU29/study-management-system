import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Container, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ChatListComponent from "../components/AppChat/ChatList";
import ChatDetailComponent from "../components/AppChat/ChatDetail";
import { useQuery } from "@tanstack/react-query";
import { getAllUserMessage } from "../services/message";
import Spinner from "../helpers/Spinner";




const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState<any>();


    const userChat = useQuery({
        queryKey:["user-chat"],
        queryFn: async () => {
            const response = await getAllUserMessage();
            return response?.data;
        }
    })

    const theme = useTheme();
    return (
        <React.Fragment>
            {userChat?.isFetching && <Spinner/>}
            <CssBaseline/>
            <Container
                maxWidth="xl"
                sx={{
                    backgroundColor: theme.customColors.backgroundGrey,
                    borderRadius: "10px",
                    padding: "15px",
                    marginTop: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                    height: "43rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                    <Grid container  sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height:"100%",
                    }}>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                borderRight:`2px solid ${theme.customColors.textGrey}`,
                            }}
                        >
                            <ChatListComponent selectedUser={selectedUser} setSelectedUser={setSelectedUser}  users={userChat?.data}/>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                height:"100%",
                            }}
                        >
                            <ChatDetailComponent selectedUser={selectedUser}/>
                        </Grid>
                    </Grid>
            </Container>
        </React.Fragment>
    );
};

export default MessagePage;
