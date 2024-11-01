import React from "react";
import { AppBar, Typography, Toolbar, Stack } from "@mui/material";

const NavigatorBar: React.FC = () => {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };
    
  return (
    <AppBar 
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              flexGrow: 1,
              width: '100%',
              gap: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: 'center', mr: 'auto' }}
            >
              <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
                Dashboard
              </Typography>
            </Stack>

          </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavigatorBar;