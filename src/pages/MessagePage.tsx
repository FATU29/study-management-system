import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Container, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ChatListComponent from "../components/AppChat/ChatList";
import ChatDetailComponent from "../components/AppChat/ChatDetail";



const MessagePage = () => {
    const [selectedUser, setSelectedUser] = useState<any>();


    const theme = useTheme();
    return (
        <React.Fragment>

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
                            <ChatListComponent selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
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
