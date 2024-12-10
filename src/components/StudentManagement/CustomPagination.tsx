import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

export const pageSizeOptions = [5, 10, 15, 20];

type TPagination = {
  currentPage: number;
  perPage: number;
  totalItems: number;
  pageSizeOptions: number[];
  onChangePagination: (current: number, perPage: number) => void;
};

const CustomPagination = (props: TPagination) => {
    const {
      currentPage,
      perPage,
      totalItems,
      pageSizeOptions,
      onChangePagination,
    } = props;
  
    const totalPages = Math.ceil(totalItems / perPage);
  
  
    const handleCurrentPageChange = (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      onChangePagination(value, perPage);
    };
  
   
    const handleSelectPageSize = (event: SelectChangeEvent<string>) => {
      const selectedPageSize = Number(event.target.value); 
      onChangePagination(currentPage, selectedPageSize);
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding:2
        }}
      >
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
         <Typography component={"div"}>
            Hàng mỗi trang
         </Typography>
          <Select
            value={String(perPage)} 
            onChange={handleSelectPageSize}
            variant="outlined"
            size="small"
            sx={{ ml: 2, minWidth: 75 }}
          >
            {pageSizeOptions.map((item) => (
              <MenuItem value={String(item)} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
  
        <Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleCurrentPageChange}
            color="primary"
            shape="rounded"
            size="small"
          />
        </Box>
      </Box>
    );
  };
  

export default CustomPagination;
