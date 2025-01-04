import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CourseTable from "../CourseManagement/Table";
import { useQuery } from "@tanstack/react-query";
import { getCourses, searchCourse } from "../../services/courses";
import Spinner from "../../helpers/Spinner";
import ModalCreateCourseComponent from "../CourseManagement/ModalCreateCourse";
import useDebounce from "../../hooks/useDebounce";

const pageSizeOptions = [5, 10, 15, 20];

const CourseAdminPanel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(pageSizeOptions[0]);
  const [searchText, setSearchText] = useState<string>("");
  const [totalItems,setTotalItems] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const debounceVal = useDebounce(searchText);
  const [rows, setRows] = useState<any[]>([]);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["courses-table", currentPage, perPage],
    queryFn: async () => {
      const data = await getCourses(currentPage, perPage);
      return data;
    },
  });

  const courseSearch = useQuery({
    queryKey: ["search-courses", debounceVal,currentPage, perPage],
    queryFn: async () => {
      const data = await searchCourse(debounceVal,currentPage,perPage);
      return data || []
    }
  });

  useEffect(() => {
    if (debounceVal && courseSearch.data?.data) {
      setRows(courseSearch.data.data);
      setTotalItems(courseSearch.data.totalItems)
    } else if (data?.data) {
      setRows(data?.data);
      setTotalItems(data?.totalItems)
    }
  }, [debounceVal, courseSearch?.data, data?.data, data?.totalItems]);

  const handleAdd = () => {
    setOpenModal(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      {isFetching && <Spinner />}

      <ModalCreateCourseComponent
        open={openModal}
        setOpen={setOpenModal}
        refetch={refetch}
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
            totalItems={totalItems}
            
          />
        </Box>
      </Box>
    </>
  );
};

export default CourseAdminPanel;
