import React from 'react';
import {Avatar, Box, Grid, Grid2, IconButton, Paper, TextField, Tooltip, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import IconifyIcon from "../utils/icon";
import {MockDataMessage} from "../../MockData/data";


const ChatDetailComponent = () => {
    const theme = useTheme();

    const data = MockDataMessage;

    return (
        <React.Fragment>
            <Grid2 container spacing={2} sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "90%",
                height: "100%",
                marginTop: "2rem",
            }}>
                <Grid item xs={12} sx={{
                    height: "12%",
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                }}>
                    <Grid container
                          sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              height: "100%",
                              width: "100%",
                          }}
                    >
                        <Grid item xs={2} sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}>
                            <Avatar src={""}/>
                        </Grid>
                        <Grid item xs={8} sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}>
                            <Grid container
                                  direction={"column"}
                            >
                                <Grid item xs={12}>
                                    <Typography textAlign={"left"} fontWeight={"bold"} variant="h6" component="div">
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography textAlign={"left"} fontSize={13} color="textSecondary" component="div">
                                        Online
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sx={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <IconButton>
                                <IconifyIcon fontSize={"1.6rem"} icon={"tabler:video"}/>
                            </IconButton>

                            <IconButton>
                                <IconifyIcon fontSize={"1.5rem"} icon={"line-md:phone-call-loop"}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{
                    height: "73%",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                    overflowY: "auto",
                    padding: "20px",
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap:2,
                        maxWidth:"90%",
                        margin: "0 auto",
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}>
                            <Box sx={{
                                padding: "20px",
                                backgroundColor: theme.palette.primary.main,
                                maxWidth: "40%",
                                borderRadius: "10px",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                            }}>
                                <Typography
                                    textAlign="left"
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        color: "white"
                                    }}
                                >
                                    Hello
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}>
                            <Box sx={{
                                padding: "20px",
                                backgroundColor: theme.palette.primary.main,
                                maxWidth: "40%",
                                borderRadius: "10px",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                            }}>
                                <Typography
                                    textAlign="left"
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        color: "white"
                                    }}
                                >
                                    Hello asdfasd fasf asdf asfsa asf saf sa
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-right",
                            alignItems: "center",
                        }}>
                            <Box sx={{
                                padding: "20px",
                                backgroundColor: theme.palette.primary.main,
                                maxWidth: "40%",
                                borderRadius: "10px",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                            }}>
                                <Typography
                                    textAlign="left"
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        color: "white"
                                    }}
                                >
                                    Hello asdfas âfádfasfasfafaádfasfafasa asdfa sdfafas fasf a
                                </Typography>
                            </Box>
                        </Box>


                    </Box>

                </Grid>

                <Grid item xs={12} sx={{
                    height: "15%"
                }}>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            padding: "5px",
                            height: "80%",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                        }}
                    >
                        <Box sx={{
                            width: "10%",
                        }}>
                            <Tooltip title={"Đính kèm"}>
                                <IconButton>
                                    <IconifyIcon fontSize={"2rem"} icon={"gridicons:add-outline"}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{
                            width: "70%",
                            display: "flex",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                        }}>
                            <TextField
                                multiline
                                fullWidth
                                placeholder="Nhập tin nhắn"
                                minRows={1}
                                maxRows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: theme.customColors.backgroundGrey,
                                        minHeight: '50px',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        }
                                    },
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        e.target.value = '';
                                    }
                                }}
                            />

                        </Box>
                        <Box sx={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Tooltip title={"Chọn emoij"}>
                                <IconButton>
                                    <IconifyIcon fontSize={"1.8rem"} icon={"uil:smile"}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Gửi"}>
                                <IconButton>
                                    <IconifyIcon fontSize={"1.8rem"} icon={"iconamoon:send"}/>
                                </IconButton>
                            </Tooltip>

                        </Box>
                    </Paper>

                </Grid>

            </Grid2>
        </React.Fragment>

    )
}


export default ChatDetailComponent;