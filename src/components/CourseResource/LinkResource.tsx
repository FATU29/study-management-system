import { useState } from "react";
import { ILinkResourceInfo } from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";

const LinkResource: React.FC<InnerResourceDetailProps> = ({
  resource,
  isEditing,
  onEditCompleted,
}) => {
  const [title, setTitle] = useState<string>(resource.title);
  const [url, setUrl] = useState<string>(
    (resource.resourceInfo as ILinkResourceInfo).url ?? ""
  );

  const handleSubmit = async () => {
    const updatedResource = {
      ...resource,
      title: title,
      resourceInfo: {
        url: url,
      },
    };

    onEditCompleted(updatedResource);
  };

  if (isEditing) {
    return (
      <div>
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
            placeholder="Link title"
            required
          ></input>

          <input
            className="w-full mb-4"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Url"
            required
          ></input>

          <div className="flex items-center justify-around mb-4 mt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Xác nhận
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

      <div className="text-center mb-4">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
};

export default LinkResource;
