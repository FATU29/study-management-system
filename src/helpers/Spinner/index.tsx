import { Box, CircularProgress } from "@mui/material";
import React from "react";


const Spinner = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    position: "fixed", 
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                }}
            >
                <CircularProgress size="3rem" /> 
            </Box>
        </React.Fragment>
    );
};



export default Spinner;