// src/components/ThemeToggle.tsx
import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '../../../contexts/ThemeContext';

const ThemeToggle: React.FC = ({...rest}) => {
  const { mode, toggleMode } = useTheme();

  return (
    <FormControlLabel
      control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
      label="Dark mode" {...rest}
    />
  );
};

export default ThemeToggle;