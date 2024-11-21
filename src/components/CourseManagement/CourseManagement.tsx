import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import CustomPagination, { pageSizeOptions } from "./CustomPagination";

export default function CourseManagementPage() {
  const theme = useTheme();

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(pageSizeOptions[0]);
  const [teacherId, setTeacherId] = React.useState<string>("");
  const [lessonId, setLessonId] = React.useState<string>("");
  const [enrollmentId, setEnrollmentId] = React.useState<string>("");
  const [deadline, setDeadline] = React.useState<string>("");

  const handleChangeTeacherId = (event: SelectChangeEvent<string>) =>
    setTeacherId(event.target.value);
  const handleChangeLessonId = (event: SelectChangeEvent<string>) =>
    setLessonId(event.target.value);
  const handleChangeEnrollmentId = (event: SelectChangeEvent<string>) =>
    setEnrollmentId(event.target.value);
  const handleChangeDeadline = (event: SelectChangeEvent<string>) =>
    setDeadline(event.target.value);

  const renderCellWithActions = (
    data: string[],
    value: string,
    onChange: (event: SelectChangeEvent<string>) => void
  ) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
        height:"100%"
      }}
    >
      <Select value={value} onChange={onChange} sx={{ minWidth: 120 }}>
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

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "courseName",
      headerName: "Tên khóa học",
      sortable: false,
      minWidth: 200,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>{return <>
        <Box sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:"100%",
          height:"100%"
        }}>
        <Typography component={"div"}>{params.row.title}</Typography>
        </Box>
      
      </>},
    },
    {
      field: "teacher",
      headerName: "Giáo viên",
      sortable: false,
      minWidth: 200,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        renderCellWithActions(
          params.row.teacherId,
          teacherId,
          handleChangeTeacherId
        ),
    },
    {
      field: "lessons",
      headerName: "Bài học",
      sortable: false,
      minWidth: 200,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        renderCellWithActions(
          params.row.lessonsId,
          lessonId,
          handleChangeLessonId
        ),
    },
    {
      field: "enrollment",
      headerName: "Học sinh",
      sortable: false,
      minWidth: 200,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        renderCellWithActions(
          params.row.enrollmentId,
          enrollmentId,
          handleChangeEnrollmentId
        ),
    },
    {
      field: "deadline",
      headerName: "Bài tập",
      sortable: false,
      minWidth: 200,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        renderCellWithActions(
          params.row.deadlines,
          deadline,
          handleChangeDeadline
        ),
    },
    {
      field: "rating",
      headerName: "Đánh giá",
      sortable: false,
      minWidth: 160,
      editable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      minWidth: 50,
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

  const rows = [
    {
      id: "507f1f77bcf86cd799439011",
      title: "Lập Trình Web Cơ Bản",
      description: "Khóa học giới thiệu về HTML, CSS và JavaScript",
      teacherId: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
      lessonsId: [
        "507f1f77bcf86cd799439014",
        "507f1f77bcf86cd799439015",
        "507f1f77bcf86cd799439016",
      ],
      enrollmentId: ["507f1f77bcf86cd799439017", "507f1f77bcf86cd799439018"],
      deadlines: ["2024-12-01", "2024-12-15", "2024-12-30"],
      rating: 4.5,
      slug: "lap-trinh-web-co-ban",
    },
    {
      id: "507f1f77bcf86cd799439021",
      title: "Lập Trình Python",
      description: "Khóa học Python từ cơ bản đến nâng cao",
      teacherId: ["507f1f77bcf86cd799439022"],
      lessonsId: ["507f1f77bcf86cd799439023", "507f1f77bcf86cd799439024"],
      enrollmentId: ["507f1f77bcf86cd799439025", "507f1f77bcf86cd799439026"],
      deadlines: ["2024-12-05", "2024-12-20"],
      rating: 4.8,
      slug: "lap-trinh-python",
    },
    {
      id: "507f1f77bcf86cd799439031",
      title: "Cơ Sở Dữ Liệu",
      description: "Thiết kế và quản lý cơ sở dữ liệu",
      teacherId: ["507f1f77bcf86cd799439032", "507f1f77bcf86cd799439033"],
      lessonsId: ["507f1f77bcf86cd799439034", "507f1f77bcf86cd799439035"],
      enrollmentId: ["507f1f77bcf86cd799439036"],
      deadlines: ["2024-12-10", "2024-12-25"],
      rating: 4.3,
      slug: "co-so-du-lieu",
    },
    {
      id: "507f1f77bcf86cd799439041",
      title: "Java Programming",
      description: "Lập trình hướng đối tượng với Java",
      teacherId: ["507f1f77bcf86cd799439042"],
      lessonsId: ["507f1f77bcf86cd799439043", "507f1f77bcf86cd799439044"],
      enrollmentId: ["507f1f77bcf86cd799439045", "507f1f77bcf86cd799439046"],
      deadlines: ["2024-12-07", "2024-12-21"],
      rating: 4.6,
      slug: "java-programming",
    },
    {
      id: "507f1f77bcf86cd799439051",
      title: "React Framework",
      description: "Phát triển ứng dụng web với React",
      teacherId: ["507f1f77bcf86cd799439052", "507f1f77bcf86cd799439053"],
      lessonsId: ["507f1f77bcf86cd799439054", "507f1f77bcf86cd799439055"],
      enrollmentId: ["507f1f77bcf86cd799439056", "507f1f77bcf86cd799439057"],
      deadlines: ["2024-12-03", "2024-12-17"],
      rating: 4.7,
      slug: "react-framework",
    },
    {
      id: "507f1f77bcf86cd799439051",
      title: "React Framework",
      description: "Phát triển ứng dụng web với React",
      teacherId: ["507f1f77bcf86cd799439052", "507f1f77bcf86cd799439053"],
      lessonsId: ["507f1f77bcf86cd799439054", "507f1f77bcf86cd799439055"],
      enrollmentId: ["507f1f77bcf86cd799439056", "507f1f77bcf86cd799439057"],
      deadlines: ["2024-12-03", "2024-12-17"],
      rating: 4.7,
      slug: "react-framework",
    },
  ];

  const Pagination = () => (
    <CustomPagination
      currentPage={currentPage}
      perPage={perPage}
      totalItems={rows.length}
      pageSizeOptions={pageSizeOptions}
      onChangePagination={(page, size) => {
        setCurrentPage(page);
        setPerPage(size);
      }}
    />
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "--DataGrid-containerBackground":"none",
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
          pagination: Pagination,
        }}
        rowHeight={80}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
