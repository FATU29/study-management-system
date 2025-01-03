import React, { useState } from "react";
import IconifyIcon from "../utils/icon";
import { ICourseResource, resourceNameBy } from "../../types/resourceType";
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
  itemBackgroundModifier?: string;
}

const iconOf: (resourceType: ResourceType) => string = (resourceType) => {
  switch (resourceType) {
    case "document":
      return "mdi:file-document-outline";
    case "link":
      return "ic:outline-link";
    case "assignment":
      return "ic:outline-assignment";
    case "announcement":
      return "ic:outline-announcement";
    default:
      return "ic:outline-question-mark";
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
  itemBackgroundModifier,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = (
    _event: {},
    _reason: "backdropClick" | "escapeKeyDown"
  ) => {
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center pb-2">
        <div className="font-bold text-xl text-left">{sectionTitle}</div>
        {isEditable && (
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setIsDialogOpen(true)}
          >
            Thêm tài liệu
          </button>
        )}
      </div>

      <div className="w-full space-y-2">
        {resources.map((resource, index) => (
          <div
            key={index}
            onClick={() => onViewDetail(resource)}
            className={`flex items-center p-2 border border-gray-200 rounded-md hover:shadow-sm cursor-pointer ${
              itemBackgroundModifier ?? ""
            }`}
          >
            <div
              title={resourceNameBy(resource.resourceType)}
              className="flex items-center"
            >
              <IconifyIcon
                icon={iconOf(resource.resourceType)}
                style={{ color: "black" }}
                className="size-8"
              />
            </div>
            <div className="ml-2 flex-1 text-left">{resource.title}</div>
            <div className="flex ml-auto">
              {isEditable && (
                <button
                  className="flex items-center justify-around mx-2 size-10 border border-gray-200 rounded-xl hover:bg-blue-400"
                  title="Chỉnh sửa"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(resource);
                  }}
                >
                  <IconifyIcon
                    icon="ic:outline-edit"
                    style={{ color: "black" }}
                    className="size-6"
                  />
                </button>
              )}
              {isEditable && (
                <button
                  className="flex items-center justify-around mx-2 size-10 border border-gray-200 rounded-xl hover:bg-red-400"
                  title="Xóa"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(resource);
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols:delete-outline-rounded"
                    style={{ color: "black" }}
                    className="size-6"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle sx={{ fontWeight: "bold" }}>{dialogTitle}</DialogTitle>
        <div className="flex flex-col items-center px-4 pb-4">
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
                  width: "80%",
                  margin: "8px",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {typeName}
              </Button>
            )
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default SectionTemplate;
