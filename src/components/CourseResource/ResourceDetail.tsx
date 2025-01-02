import { useState } from "react";
import { ICourseResource, resourceNameBy } from "../../types/resourceType";
import AnnouncementResource from "./AnnoucementResource";
import IconifyIcon from "../utils/icon";
import LinkResource from "./LinkResource";
import DocumentResource from "./DocumentResource";
import AssignmentResource from "./AssignmentResource";

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
      return <AssignmentResource {...innerProps} />;
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
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex flex-row items-center justify-between mb-2">
        <button
          onClick={onReturn}
          title="Quay lại"
          className="px-2 py-2 size-10 bg-blue-300 text-white rounded-md hover:bg-blue-400"
        >
          <div className="flex items-center justify-around">
            <IconifyIcon icon="bi:arrow-left" />
          </div>
        </button>

        <h2 className="my-2 text-lg font-semibold mx-24">
          {resourceNameBy(resource.resourceType)}
        </h2>

        <div className="px-2 py-2 size-10" />
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
