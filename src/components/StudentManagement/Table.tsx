import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Tooltip, IconButton, useTheme, SelectChangeEvent } from "@mui/material";
import IconifyIcon from "../utils/icon";
import ActionsCell from "./ActionShell";
import PaginationComponent from "./PaginationComponent";

interface CourseTableProps {
  rows: any[];
  currentPage: number;
  perPage: number;
  setCurrentPage: (page: number) => void;
  setPerPage: (size: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ rows, currentPage, perPage, setCurrentPage, setPerPage }) => {
  const theme = useTheme();

  const [teacherId, setTeacherId] = React.useState<string>("");
  const [enrollmentId, setEnrollmentId] = React.useState<string>("");

  const handleChangeTeacherId = (event: SelectChangeEvent<string>) => setTeacherId(event.target.value as string);
  const handleChangeEnrollmentId = (event: SelectChangeEvent<string>) => setEnrollmentId(event.target.value as string);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "courseName",
      headerName: "Tên khóa học",
      sortable: false,
      flex: 1,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography component={"div"}>{params.row.title}</Typography>
        </Box>
      ),
    },
    {
      field: "teacher",
      headerName: "Giáo viên",
      sortable: false,
      flex: 1,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionsCell
          data={params.row.teacherId}
          value={teacherId}
          onChange={handleChangeTeacherId}
        />
      ),
    },
    {
      field: "enrollment",
      headerName: "Học sinh",
      sortable: false,
      flex: 1,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionsCell
          data={params.row.enrollmentId}
          value={enrollmentId}
          onChange={handleChangeEnrollmentId}
        />
      ),
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      flex: 0.5,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Tooltip title="delete">
          <IconButton>
            <IconifyIcon icon="streamline:delete-1-solid" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "--DataGrid-containerBackground": "none",
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            background: "none",
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: "#fff",
          },
        }}
        slots={{
          pagination: () => (
            <PaginationComponent
              currentPage={currentPage}
              perPage={perPage}
              totalItems={rows.length}
              onChangePagination={(page, size) => {
                setCurrentPage(page);
                setPerPage(size);
              }}
            />
          ),
        }}
        rowHeight={80}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default CourseTable;
