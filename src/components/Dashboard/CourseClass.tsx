import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { ClassResource, ResourceType } from "../types/class-resource";
import { useNavigate } from "react-router-dom";

const resourceIcon = (type: ResourceType) => {
  switch (type) {
    case "document":
      return "📄";
    case "link":
      return "🔗";
    case "assignment":
      return "📝";
    case "announcement":
      return "📢";
    default:
      return "❓";
  }
};
const editIcon = "🖊️";

const CourseClass: React.FC<{
  classId: string;
  title: string;
  teachers: string[];
  resources: ClassResource[];
}> = ({ classId, title, teachers, resources }) => {
  const labels = Array.from(
    new Set(resources.map((resource) => resource.sectionLabel))
  );
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Giáo viên: {teachers.join(", ")}
      </Typography>

      {labels.map((label) => {
        const sectionResources = resources.filter(
          (resource) => resource.sectionLabel === label
        );
        return (
          <ClassSection
            key={label}
            classId={classId}
            label={label}
            resources={sectionResources}
          />
        );
      })}
    </Box>
  );
};

type ResourceEditHandler = (resource: ClassResource) => void;
type ResourceUploadHandler = (
  resourceType: ResourceType,
  labelName: string
) => void;
const resourceTypes: ResourceType[] = [
  "document",
  "link",
  "assignment",
  "announcement",
];
const dialogTitle = "Select the type of resource to upload";

const ClassSection: React.FC<{
  classId: string;
  label: string;
  resources: ClassResource[];
}> = ({ classId, label, resources }) => {
  const navigate = useNavigate();
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleEditResource: ResourceEditHandler = (resource) => {
    alert(
      `Resolve editting the resource "${resource.title}" with resourse type "${resource.type}"!`
    );
  };

  const handleUploadResource: ResourceUploadHandler = (
    resourceType,
    labelName
  ) => {
    const noExplicitSpaceLabel = labelName.replace(/\s/g, "-");
    navigate(
      `upload-resource/?classId=${classId}&label=${noExplicitSpaceLabel}&type=${resourceType}`
    );
  };

  const handleDialogClose = (
    _event: {},
    _reason: "backdropClick" | "escapeKeyDown"
  ) => {
    setIsDialogOpened(false);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "left", fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        {resources.map((resource) => {
          const resourceUrl =
            resource.type === "link" ? resource.url : undefined;

          return (
            <Box key={resource.id} display="flex" gap={1}>
              <Typography variant="body2">
                {resourceIcon(resource.type)}
              </Typography>
              <Typography variant="body2" component="a" href={resourceUrl}>
                {resource.title}
              </Typography>
              <Typography
                onClick={() => handleEditResource(resource)}
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                {editIcon}
              </Typography>
            </Box>
          );
        })}

        <Button
          onClick={() => setIsDialogOpened(true)}
          variant="contained"
          color="primary"
          sx={{ width: "200px" }}
        >
          Click to Upload
        </Button>

        <Dialog onClose={handleDialogClose} open={isDialogOpened}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Box display="flex" flexDirection="column">
            {resourceTypes.map((type) => (
              <Button
                key={type}
                onClick={() => {
                  setIsDialogOpened(false);
                  handleUploadResource(type, label);
                }}
                variant="contained"
                color="primary"
              >
                {type}
              </Button>
            ))}
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CourseClass;
