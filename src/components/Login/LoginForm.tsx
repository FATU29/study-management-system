import React, { ChangeEvent, FormEvent } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Define the prop types for the component if necessary (e.g., for theme and handlers)
interface LoginProps {
  theme: any; // Specify the type of your theme if available
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleValidationUsername: () => void;
  handleValidationPassword: () => void;
  renderNotice: () => React.ReactNode;
}

const LoginForm: React.FC<LoginProps> = ({
  theme,
  handleSubmit,
  handleChange,
  handleValidationUsername,
  handleValidationPassword,
  renderNotice,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        id="login"
        style={{
          maxWidth: '1120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="mx-auto"
        container
        component="main"
        sx={{ height: '100vh' }}
      >
        <CssBaseline />
        <Grid item xs={12} md={6}>
          <Box
            mx={6}
            my={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <img
                src="/assets/img/Friendly_logo.png"
                alt="Friendly"
                style={{
                  height: '70px',
                  width: 'auto',
                }}
              />
            </Link>

            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>

            {renderNotice()}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                type="text"
                name="username"
                autoComplete="current-username"
                onChange={handleChange}
                onBlur={handleValidationUsername}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleValidationPassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ tên tài khoản"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <a
                    href="#login"
                    style={{ textDecoration: 'none' }}
                  >
                    Quên mật khẩu?
                  </a>
                </Grid>
                <Grid item>
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none' }}
                  >
                    {"Chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={false} md={6}>
          <img
            src="/assets/img/intro_login.svg"
            alt="intro"
            style={{
              width: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
