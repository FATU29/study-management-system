import * as React from "react";
import Box from "@mui/material/Box";
import { Select, MenuItem, SelectChangeEvent, IconButton, Tooltip } from "@mui/material";
import IconifyIcon from "../utils/icon";

interface ActionsCellProps {
  data: string[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ data, value, onChange }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}
  >
    <Select value={value} onChange={onChange} sx={{ minWidth: 200 }}>
      {data.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="add">
        <IconButton>
          <IconifyIcon icon="material-symbols:add" fontSize={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete">
        <IconButton>
          <IconifyIcon icon="material-symbols:delete-outline" fontSize={20} />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

export default ActionsCell;
