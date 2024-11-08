import React, {useEffect} from 'react';
import {
    Avatar, Badge,
    Box,
    Container,
    Grid,
    Grid2,
    IconButton,
    InputAdornment,
    Menu, MenuItem, MenuItemProps, styled,
    TextField,
    Typography
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import {MockDataChatList} from "../../MockData/data";
import {useTheme} from "@mui/material/styles";

const options = [
    'Đã đọc', 'Xóa'
];

const ITEM_HEIGHT = 48;


const StyledMenu = styled(Menu)(({theme}) => ({
    '& .MuiPaper-root': {
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        borderRadius: 6,
        marginTop: 2,
        minWidth: '20ch',
        outline: "none"
    }
}));

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
    padding: '8px 16px',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected
    }
}));


const ChatListComponent = () => {


    const [menuState, setMenuState] = React.useState<Record<string, any>>({});
    const [activeUser,setActiveUser] = React.useState<string>("1");

    const handleClick = (event: any, id: any) => {
        setMenuState({
            ...menuState,
            [id]: {
                anchorEl: event.currentTarget,
                open: true
            }
        });
    };

    const handleClose = (id: any) => {
        setMenuState({
            ...menuState,
            [id]: {
                anchorEl: null,
                open: false
            }
        });
    };

    const handleClickMessage = (id:string) => {
        if(id === activeUser) return;
        setActiveUser(id);
    }


    const theme = useTheme();

    const data = MockDataChatList;

    const renderChatListData = () => {

        return data.map((item) => (
            <React.Fragment key={item.id}>
                <Grid
                    onClick={() => handleClickMessage(item.id)}
                    container
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: activeUser === item.id ?  theme.palette.primary.main :  theme.palette.background.paper,
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                        color:activeUser === item.id ?  'white' :  'black',
                        alignItems: "center",
                        cursor:"pointer",
                        "&:hover":{
                            backgroundColor: theme.palette.grey["400"],
                            color:"black"
                        },
                        "&:active":{
                            backgroundColor:theme.palette.primary.main,
                            color:"white",
                        }
                    }}
                >
                    <Grid item xs={2.5} alignItems={"center"} direction="row">
                        <Avatar src={item?.avatar}/>
                    </Grid>


                    <Grid item xs={7.5}>
                        <Grid container direction="column" alignItems={"flex-start"}>
                            <Grid item>
                                <Typography fontWeight="bold">
                                    {item?.name}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Grid container direction={"row"}  justifyContent="space-between" alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography
                                            sx={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                maxWidth: 130,
                                                fontSize: 15
                                            }}
                                        >
                                            {item?.latestMessage}
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

                    <Grid item xs={2}>
                        <Box sx={{position: 'relative'}}>
                            <IconButton
                                aria-label="more"
                                id={`menu-button-${item.id}`}
                                aria-controls={menuState[item.id]?.open ? `menu-${item.id}` : undefined}
                                aria-expanded={menuState[item.id]?.open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, item.id)}
                                size="small"
                            >
                                <IconifyIcon fontSize={20} icon="weui:more-filled"/>
                            </IconButton>

                            <StyledMenu
                                id={`menu-${item.id}`}
                                MenuListProps={{
                                    'aria-labelledby': `menu-button-${item.id}`,
                                }}
                                anchorEl={menuState[item.id]?.anchorEl}
                                open={Boolean(menuState[item.id]?.open)}
                                onClose={() => handleClose(item.id)}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option, index) => (
                                    <StyledMenuItem
                                        key={index}
                                        selected={option === 'Pyxis'}
                                        onClick={() => handleClose(item.id)}
                                    >
                                        {option}
                                    </StyledMenuItem>
                                ))}
                            </StyledMenu>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: "0",
                                    left: "50%",
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'black',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </React.Fragment>
        ));
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
                        fullWidth
                        id="input-with-icon-textfield"
                        label="Tìm kiếm"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconifyIcon icon={"material-symbols:search"} fontSize={"25px"}/>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"/>
                    <Typography alignSelf={"start"} variant="body2" component="div">Gần đây</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                            height:"32.5rem",
                            gap: "5px",
                            overflow: "auto",
                            padding: "10px"
                        }}>
                        {renderChatListData()}

                    </Box>
                </Box>
            </Container>

        </React.Fragment>
    )
}

export default ChatListComponent;