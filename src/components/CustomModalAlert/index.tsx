import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import React from "react";

interface TCustomModal {
  headerTitle: string;
  bodyContent: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doOk: () => void
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};

const CustomModalAlert = (props: TCustomModal) => {
  const { 
    headerTitle, 
    bodyContent , 
    isOpen,
    setIsOpen,
    doOk
 } = props;

 const handleClose = () => setIsOpen(false);

 const theme = useTheme();

  return (
    <>
      <div>
        <Modal
          open={isOpen}
          onClose={setIsOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="flex flex-col justify-center gap-4">
            <Typography id="modal-modal-title" variant="h4" fontWeight={"bold"} letterSpacing={"3px"} component="h2" textAlign={"center"}>
              {headerTitle}
            </Typography>
            <Typography id="modal-modal-description">
              {bodyContent}
            </Typography>
            <Box className="flex justify-between items-center">
                <Button onClick={handleClose} sx={
                    {
                        backgroundColor: theme.palette.error.main,
                        color:theme.palette.common.white
                    }
                }>
                    <Typography>Cancel</Typography>
                </Button>
                <Button onClick={doOk} sx={
                    {
                        backgroundColor: theme.palette.success.main,
                        color:theme.palette.common.white
                    }
                }>
                    <Typography>Ok</Typography>
                </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CustomModalAlert;
