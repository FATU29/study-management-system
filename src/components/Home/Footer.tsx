import { useTheme } from "@mui/material";
import IconifyIcon from "../utils/icon";


const Footer = () => {

    const theme = useTheme();


    return <>
        <div style={{
            color:theme.palette.text.primary
        }}>
            Hello Footer
        </div>

        <div>
            <IconifyIcon icon={'mdi:user'} style={{
                fontSize:"10rem",
                width:"100%",
                textAlign:"center"
            }}></IconifyIcon>
        </div>
    
    </>
}


export default Footer