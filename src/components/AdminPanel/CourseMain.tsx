import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CourseTable from "../CourseManagement/Table";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/courses";
import Spinner from "../../helpers/Spinner";
import ModalCreateCourseComponent from "../CourseManagement/ModalCreateCourse";

const pageSizeOptions = [5, 10, 15, 20];

const CourseAdminPanel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isFetching } = useQuery({
    queryKey: ["courses-table", currentPage, perPage],
    queryFn: async () => {
      const data = await getCourses(currentPage, perPage);
      return data;
    },
  });

  const rows = data?.data;

  const handleAdd = () => {
    setOpenModal(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      {isFetching && <Spinner/>}

      <ModalCreateCourseComponent
        open={openModal}
        setOpen={setOpenModal}
      />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", m: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{
              height: 54,
              width: 100,
              fontSize: "1rem",
              padding: "0 10px",
              borderRadius: "8px",
              textTransform: "none",
              color: "white",
            }}
          >
            Thêm
          </Button>

          <TextField
            label="Tìm kiếm"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ ml: 2 }}
          />
        </Box>
        <Box sx={{ m: 2 }}>
          <CourseTable
            rows={rows}
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
            pageSizeOptions={pageSizeOptions}
          />
        </Box>
      </Box>
    </>
  );
};

export default CourseAdminPanel;
