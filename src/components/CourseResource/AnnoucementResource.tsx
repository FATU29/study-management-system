import { useEffect, useState } from "react";
import { IAnnouncementResourceInfo } from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";
import { UpdateCourseResourceRequestBody } from "../../services/resourceType";
import { addResourceAPI } from "../../services/resourcesCourse";

const AnnouncementResource: React.FC<InnerResourceDetailProps> = ({
  resource,
  isEditing,
  isEditConfirmed,
  onEditCompleted,
}) => {
  const [title, setTitle] = useState<string>(resource.title);
  const [content, setContent] = useState<string>(
    (resource.resourceInfo as IAnnouncementResourceInfo).content ?? ""
  );

  // if (isEditConfirmed) {
  //   const updatedResource = {
  //     ...resource,
  //     title: title,
  //     resourceInfo: {
  //       content: content,
  //     },
  //   };

  //   onEditCompleted(updatedResource);
  //   return;
  // }

  useEffect(() => {
    if (isEditConfirmed) {
      const updatedResource = {
        ...resource,
        title: title,
        resourceInfo: {
          content: content,
        },
      };

      onEditCompleted(updatedResource);
    }
  }, [isEditConfirmed]);

  if (isEditing && !isEditConfirmed) {
    return (
      <div
        className={
          "" /* "p-4 bg-white border border-gray-300 rounded-lg shadow-lg" */
        }
      >
        <input
          className="w-full mb-4 text-2xl font-bold"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Announcement title"
        ></input>

        <textarea
          className="w-full mb-4"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Announcement content"
          rows={10}
        ></textarea>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-grow text-center">
        <h2 className="text-2xl font-bold">{resource.title}</h2>
      </div>

      <div className="text-center mb-4">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AnnouncementResource;
