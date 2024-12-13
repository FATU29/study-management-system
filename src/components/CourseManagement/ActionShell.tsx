import * as React from "react";
import Box from "@mui/material/Box";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Tooltip,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import { toFullName } from "../../helpers/toFullName";
import ModalActionComponent from "./ModalAction";

interface ActionsCellProps {
  data: string[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  propKey?:string;
  courseId?:string;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ courseId,propKey,data, value, onChange }) => {
  const [openAdd,setOpenAdd] = React.useState<boolean>(false);
  const [openDelete,setOpenDelete] = React.useState<boolean>(false);


  return (
    <>
      <ModalActionComponent action="Thêm" courseId={courseId} propKey={propKey} open={openAdd} setOpen={setOpenAdd}/>
      <ModalActionComponent action="Xóa" courseId={courseId} propKey={propKey} open={openDelete} setOpen={setOpenDelete}/>
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
          {data.map((item:any, index) => (
            <MenuItem key={index} value={item}>
              {toFullName(item?.firstName,item?.lastName)}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="add">
            <IconButton onClick={() => {
              setOpenAdd(true);
            }}>
              <IconifyIcon icon="material-symbols:add" fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete">
            <IconButton onClick={() => {
              setOpenDelete(true);
            }}>
              <IconifyIcon
                icon="material-symbols:delete-outline"
                fontSize={20}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default ActionsCell;
