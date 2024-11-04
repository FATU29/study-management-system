import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Container, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ChatListComponent from "../components/AppChat/ChatList";
import ChatDetailComponent from "../components/AppChat/ChatDetail";
import UserDetailComponent from "../components/AppChat/UserDetail";

const MessagePage = () => {


    const theme = useTheme();
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container
                maxWidth="lg"
                sx={{
                    backgroundColor: theme.customColors.backgroundGrey,
                    borderRadius: "10px",
                    padding: "15px",
                    marginTop: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                }}
            >
                <Box sx={
                    {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width:"100%",

                    }
                }>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={4}
                        >
                            <ChatListComponent/>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ChatDetailComponent/>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <UserDetailComponent/>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </React.Fragment>
    );
};

export default MessagePage;
