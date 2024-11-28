import { Box, Typography } from "@mui/material";
import React from "react";

type CourseClassProps = {
  courseName: string;
};

const CourseClass: React.FC<CourseClassProps> = (prop: CourseClassProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {prop.courseName}
      </Typography>

      <ClassSection label="Thông tin môn học">
        <InfoSection />
      </ClassSection>

      <ClassSection label="Tài liệu">
        <DocumentSection />
      </ClassSection>

      <ClassSection label="Lý thuyết">
        <TheorySection />
      </ClassSection>

      <ClassSection label="Thực hành">
        <PracticeSection />
      </ClassSection>
    </Box>
  );
};

type ClassSectionProps = {
  label: string;
  children: React.ReactNode;
};

const ClassSection: React.FC<ClassSectionProps> = ({
  label: sectionLabel,
  children,
}: ClassSectionProps) => {
  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom textAlign={"left"}>
        {sectionLabel}
      </Typography>

      {children}
    </Box>
  );
};

const InfoSection: React.FC = () => {
  return <></>;
};

const DocumentSection: React.FC = () => {
  return <></>;
};

const TheorySection: React.FC = () => {
  return <></>;
};

const PracticeSection: React.FC = () => {
  return <></>;
};

export default CourseClass;
