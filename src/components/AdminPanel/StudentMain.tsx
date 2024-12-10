import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import CourseTable from '../CourseManagement/Table';

const StudentAdminPanel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');

  const rows = [
    {
      id: "001",
      title: "Nguyen Van A",
      description: " ",
      teacherId: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
      enrollmentId: ["507f1f77bcf86cd799439017", "507f1f77bcf86cd799439018"],
      slug: "lap-trinh-web-co-ban",
    },
    {
      id: "507f1f77bcf86cd799439021",
      title: "Lập Trình Python",
      description: "Khóa học Python từ cơ bản đến nâng cao",
      teacherId: ["507f1f77bcf86cd799439022"],
      enrollmentId: ["507f1f77bcf86cd799439025", "507f1f77bcf86cd799439026"],
      slug: "lap-trinh-python",
    },
    {
      id: "507f1f77bcf86cd799439031",
      title: "Cơ Sở Dữ Liệu",
      description: "Thiết kế và quản lý cơ sở dữ liệu",
      teacherId: ["507f1f77bcf86cd799439032", "507f1f77bcf86cd799439033"],
      enrollmentId: ["507f1f77bcf86cd799439036"],
      slug: "co-so-du-lieu",
    },
    {
      id: "507f1f77bcf86cd799439041",
      title: "Java Programming",
      description: "Lập trình hướng đối tượng với Java",
      teacherId: ["507f1f77bcf86cd799439042"],
      enrollmentId: ["507f1f77bcf86cd799439045", "507f1f77bcf86cd799439046"],
      slug: "java-programming",
    },
    {
      id: "507f1f77bcf86cd799439051",
      title: "React Framework",
      description: "Phát triển ứng dụng web với React",
      teacherId: ["507f1f77bcf86cd799439052", "507f1f77bcf86cd799439053"],
      enrollmentId: ["507f1f77bcf86cd799439056", "507f1f77bcf86cd799439057"],
      slug: "react-framework",
    },
  ];

  const handleAdd = () => {
    // Implement the add functionality
    console.log("Add button clicked");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', m:2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ height: 54, width: 100, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none', color:'white' }}
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
      <Box sx={{m:2}}>
        <CourseTable 
            rows={rows}
            currentPage={currentPage}
            perPage={perPage}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
        />
        </Box>
    </Box>
  );
};

export default StudentAdminPanel;
