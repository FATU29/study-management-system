import { useState } from "react";
import { IAnnouncementResourceInfo } from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";

const AnnouncementResource: React.FC<InnerResourceDetailProps> = ({
  resource,
  isEditing,
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

  const handleSubmit = async () => {
    const updatedResource = {
      ...resource,
      title: title,
      resourceInfo: {
        content: content,
      },
    };

    onEditCompleted(updatedResource);
  };

  if (isEditing) {
    return (
      <div
        className={
          "" /* "p-4 bg-white border border-gray-300 rounded-lg shadow-lg" */
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="w-full mb-4 text-2xl font-bold"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Announcement title"
            required
          ></input>

          <textarea
            className="w-full mb-4 text-justify"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Announcement content"
            rows={10}
            required
          ></textarea>

          <div className="flex items-center justify-around mb-4 mt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-500 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex-grow text-center">
        <h2 className="text-2xl font-bold">{resource.title}</h2>
      </div>

      <div className="text-left whitespace-pre-wrap">{content}</div>
    </div>
  );
};

export default AnnouncementResource;
