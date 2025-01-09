import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Typography,
  Tooltip,
  IconButton,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import IconifyIcon from "../utils/icon";
import ActionsCell from "./ActionShell";
import PaginationComponent from "./PaginationComponent";
import CustomModalAlert from "../CustomModalAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../../services/courses";
import Spinner from "../../helpers/Spinner";

interface CourseTableProps {
  rows: any[];
  currentPage: number;
  perPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  pageSizeOptions: Array<number>;
  totalItems: number;
}

const CourseTable: React.FC<CourseTableProps> = ({
  totalItems,
  rows,
  pageSizeOptions,
  currentPage,
  perPage,
  setCurrentPage,
  setPerPage,
}) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [idDelete, setIdDelete] = React.useState<string>("");

  const [teacherId, setTeacherId] = React.useState<string>("");
  const [enrollmentId, setEnrollmentId] = React.useState<string>("");

  const handleChangeTeacherId = (event: SelectChangeEvent<string>) =>
    setTeacherId(event.target.value as string);
  const handleChangeEnrollmentId = (event: SelectChangeEvent<string>) =>
    setEnrollmentId(event.target.value as string);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async (idDelete: string) => {
      await deleteCourse(idDelete);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses-table"] });
    },
  });

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
      renderCell: (params) => {
        return (
          <ActionsCell
            data={params.row.teacherDetails}
            value={teacherId}
            onChange={handleChangeTeacherId}
            propKey={"giáo viên"}
            courseId={params.row._id}
          />
        );
      },
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
          data={params.row.enrollmentDetails}
          value={enrollmentId}
          onChange={handleChangeEnrollmentId}
          propKey={"học sinh"}
          courseId={params.row._id}
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
      renderCell: (params) => (
        <Tooltip title="delete">
          <IconButton
            onClick={() => {
              setIdDelete(params.row._id);
              setOpenModal(true);
            }}
          >
            <IconifyIcon icon="streamline:delete-1-solid" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      {isPending && <Spinner />}
      <CustomModalAlert
        headerTitle="Thông báo"
        bodyContent="Bạn có chắc chắn muốn xóa"
        isOpen={openModal}
        setIsOpen={setOpenModal}
        doOk={() => {
          mutate(idDelete);
          setOpenModal(false);
          setIdDelete("");
        }}
      />

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row?._id}
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
                onChangePagination={(page, size) => {
                  setCurrentPage(page);
                  setPerPage(size);
                }}
                pageSizeOptions={pageSizeOptions}
                totalItems={totalItems}
              />
            ),
          }}
          rowHeight={80}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default CourseTable;
