import { useState } from "react";
import { ICourseResource } from "../../types/resourceType";
import { json } from "stream/consumers";
import AnnouncementResource from "./AnnoucementResource";
import Iconify from "@iconify/iconify";
import IconifyIcon from "../utils/icon";

interface ResourceDetailProps {
  resource: ICourseResource;
  isEditing?: boolean;
  onReturn: () => void;
  onEditCompleted: (resource: ICourseResource) => void;
}

export interface InnerResourceDetailProps {
  resource: ICourseResource;
  isEditing: boolean;
  isEditConfirmed: boolean;
  onEditCompleted: (resource: ICourseResource) => void;
}

const ResourceDetailByType: React.FC<InnerResourceDetailProps> = (
  innerProps
) => {
  switch (innerProps.resource.resourceType) {
    case "announcement":
      return <AnnouncementResource {...innerProps} />;
    case "document":
      return (
        <div className="wrap">
          <p>Document: {JSON.stringify(innerProps.resource, null, " ")}</p>
        </div>
      );
    case "link":
      return (
        <div className="wrap">
          <p>Link: {JSON.stringify(innerProps.resource, null, " ")}</p>
        </div>
      );
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

const ResourceDetail: React.FC<ResourceDetailProps> = ({
  resource,
  isEditing,
  onReturn,
  onEditCompleted,
}) => {
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false);

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg mb-4">
      <div className="flex items-center justify-left mb-2">
        <button
          onClick={onReturn}
          className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <div className="flex items-center justify-around">
            <IconifyIcon icon="bi:arrow-left" />
          </div>
        </button>
      </div>

      <ResourceDetailByType
        resource={resource}
        isEditing={isEditing ?? false}
        isEditConfirmed={isEditConfirmed}
        onEditCompleted={onEditCompleted}
      />

      <div className="flex items-center justify-around mb-4 mt-4">
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
      </div>
    </div>
  );
};

export default ResourceDetail;
