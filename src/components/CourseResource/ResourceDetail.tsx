import { useState } from "react";
import { ICourseResource } from "../../types/resourceType";
import AnnouncementResource from "./AnnoucementResource";
import IconifyIcon from "../utils/icon";
import LinkResource from "./LinkResource";
import DocumentResource from "./DocumentResource";

interface ResourceDetailProps {
  resource: ICourseResource;
  isEditing?: boolean;
  onReturn: () => void;
  onEditCompleted: (resource: ICourseResource) => void;
}

export interface InnerResourceDetailProps {
  resource: ICourseResource;
  isEditing: boolean;
  onEditCompleted: (resource: ICourseResource) => void;
}

const ResourceDetailByType: React.FC<InnerResourceDetailProps> = (
  innerProps
) => {
  switch (innerProps.resource.resourceType) {
    case "announcement":
      return <AnnouncementResource {...innerProps} />;
    case "document":
      return <DocumentResource {...innerProps} />;
    case "link":
      return <LinkResource {...innerProps} />;
    case "assignment":
      return (
        <div className="wrap">
          <p>Assignment: {JSON.stringify(innerProps.resource, null, " ")}</p>
        </div>
      );
    default:
      return <> </>;
  }
};

const resourceNameBy = (resourceType: string) => {
  switch (resourceType) {
    case "announcement":
      return "Thông báo";
    case "document":
      return "Tài liệu";
    case "link":
      return "Liên kết";
    case "assignment":
      return "Bài tập";
    default:
      return "Tài liệu";
  }
};

const ResourceDetail: React.FC<ResourceDetailProps> = ({
  resource,
  isEditing,
  onReturn,
  onEditCompleted,
}) => {
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false);

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg mb-4">
      <div className="flex flex-row items-center justify-between mb-2">
        <button
          onClick={onReturn}
          className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <div className="flex items-center justify-around">
            <IconifyIcon icon="bi:arrow-left" />
          </div>
        </button>

        <h2 className="text-lg font-semibold">
          {resourceNameBy(resource.resourceType)}
        </h2>

        <div className="px-2 py-2" />
      </div>

      <ResourceDetailByType
        resource={resource}
        isEditing={isEditing ?? false}
        onEditCompleted={onEditCompleted}
      />

      {/* <div className="flex items-center justify-around mb-4 mt-4">
        {isEditing && (
          <button
            className="px-8 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setIsEditConfirmed(true);
            }}
          >
            OK
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ResourceDetail;
