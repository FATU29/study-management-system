// src/components/ThemeToggle.tsx
import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { useTheme } from '../../../contexts/ThemeContext';

type ThemeToggleProps = Omit<FormControlLabelProps, 'control' | 'label'>;

const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const { mode, toggleMode } = useTheme();

  return (
    <FormControlLabel
      control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
      label="Dark mode"
      {...props}
    />
  );
};

export default ThemeToggle;