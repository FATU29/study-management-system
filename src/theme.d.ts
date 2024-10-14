import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      dark: string;
      main: string;
      light: string;
      lightPaperBg: string;
      darkPaperBg: string;
      bodyBg: string;
      trackBg: string;
      avatarBg: string;
      tableHeaderBg: string;
      borderColor: string;
    };
  }
  interface ThemeOptions {
    customColors?: {
      dark?: string;
      main?: string;
      light?: string;
      lightPaperBg?: string;
      darkPaperBg?: string;
      bodyBg?: string;
      trackBg?: string;
      avatarBg?: string;
      tableHeaderBg?: string;
      borderColor?: string;
    };
  }
}