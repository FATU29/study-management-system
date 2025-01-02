import React, { useState } from "react";
import IconifyIcon from "../utils/icon";
import { ICourseResource } from "../../types/resourceType";
import { ResourceType } from "../types/class-resource";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";

interface SectionTemplateProps {
  sectionTitle: string;
  resources: ICourseResource[];
  isEditable?: boolean;
  onViewDetail: (resource: ICourseResource) => void;
  onEdit?: (resource: ICourseResource) => void;
  onDelete?: (resource: ICourseResource) => void;
  onCreateNew?: (resourceType: ResourceType) => void;
}

const IconOf: (resourceType: ResourceType) => string = (resourceType) => {
  switch (resourceType) {
    case "document":
      return "carbon:document";
    case "link":
      return "carbon:link";
    case "assignment":
      return "carbon:task";
    case "announcement":
      return "carbon:notification-counter";
    default:
      return "carbon:unknown";
  }
};

const uploadingResourceTypes: Map<string, ResourceType> = new Map([
  ["Thông báo", "announcement"],
  ["Tài liệu", "document"],
  ["Liên kết", "link"],
  ["Bài tập", "assignment"],
]);
const dialogTitle = "Chọn loại tài liệu muốn thêm";

const SectionTemplate: React.FC<SectionTemplateProps> = ({
  sectionTitle,
  resources,
  isEditable,
  onViewDetail,
  onEdit,
  onDelete,
  onCreateNew,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = (
    _event: {},
    _reason: "backdropClick" | "escapeKeyDown"
  ) => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4 pb-2">
        <div className="font-bold text-xl text-left">{sectionTitle}</div>
        {isEditable && (
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsDialogOpen(true)}
          >
            Thêm tài liệu
          </button>
        )}
      </div>

      <div className="w-full space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            onClick={() => onViewDetail(resource)}
            className="flex items-center p-2 border border-gray-200 rounded-md hover:shadow-sm cursor-pointer"
          >
            <IconifyIcon
              icon={IconOf(resource.resourceType)}
              width="20"
              height="20"
              style={{ color: "black" }}
            />
            <div className="ml-2 flex-1 text-left">{resource.title}</div>
            <div className="flex ml-auto">
              {isEditable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(resource);
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols-light:edit-outline"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </button>
              )}
              {isEditable && (
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(resource);
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols:delete-outline-rounded"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Box display="flex" flexDirection="column">
          {Array.from(uploadingResourceTypes.entries()).map(
            ([typeName, type]) => (
              <Button
                key={type}
                onClick={() => {
                  setIsDialogOpen(false);
                  onCreateNew && onCreateNew(type);
                }}
                variant="contained"
                color="primary"
                style={{
                  margin: "8px",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {typeName}
              </Button>
            )
          )}
        </Box>
      </Dialog>
    </div>
  );
};

export default SectionTemplate;
