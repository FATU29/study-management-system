import { ThemeOptions } from '@mui/material/styles';

const themeConfig = (mode: 'light' | 'dark'): ThemeOptions => {
  const whiteColor = '#FFFFFF';
  const lightColor = '#F0F0F0';
  const darkColor = '#121212';
  const darkPaperBgColor = '#1E1E1E';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const customColors = {
    dark: darkColor,
    main: mainColor,
    light: lightColor,
    lightPaperBg: whiteColor,
    darkPaperBg: darkPaperBgColor,
    bodyBg: mode === 'light' ? '#F4F5FA' : '#181A1B',
    trackBg: mode === 'light' ? '#ECECEC' : '#2C2C2C',
    avatarBg: mode === 'light' ? '#E0E0E0' : '#3C3C3C',
    tableHeaderBg: mode === 'light' ? '#F8F8F8' : '#2B2B2B',
    borderColor: `rgba(${mainColor}, 0.16)`,
  };

  return {
    customColors,
    palette: {
      mode,
      primary: {
        light: '#9F7FEF',
        main: '#7955D9',
        dark: '#4C36B3',
        contrastText: whiteColor,
      },
      secondary: {
        light: '#B0B3B9',
        main: '#8C8F96',
        dark: '#60636A',
        contrastText: whiteColor,
      },
      error: {
        light: '#F28B8B',
        main: '#E74C3C',
        dark: '#C0392B',
        contrastText: whiteColor,
      },
      warning: {
        light: '#FFCD74',
        main: '#FFA726',
        dark: '#FB8C00',
        contrastText: whiteColor,
      },
      info: {
        light: '#4FC3F7',
        main: '#03A9F4',
        dark: '#0288D1',
        contrastText: whiteColor,
      },
      success: {
        light: '#81C784',
        main: '#4CAF50',
        dark: '#388E3C',
        contrastText: whiteColor,
      },
      grey: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#F5F5F5',
        A200: '#EEEEEE',
        A400: '#BDBDBD',
        A700: '#616161',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
        disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.38)',
      },
      divider: `rgba(${mainColor}, 0.12)`,
      background: {
        paper: mode === 'light' ? whiteColor : darkPaperBgColor,
        default: mode === 'light' ? lightColor : darkColor,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: customColors.bodyBg,
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
          },
        },
      },

    },
  };
};

export default themeConfig;