import { useState } from "react";
import {
  emptyFile,
  IDocumentResourceInfo,
  IFile,
} from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";
import IconifyIcon from "../utils/icon";
import { uploadFileAPI, getFileAPI } from "../../services/file";
import { fileIconByExtension } from "../../helpers/fileIconByExtension";

const DocumentResource: React.FC<InnerResourceDetailProps> = ({
  resource,
  isEditing,
  onEditCompleted,
}) => {
  const [title, setTitle] = useState<string>(resource.title);
  const [file] = useState<IFile>(
    (resource.resourceInfo as IDocumentResourceInfo).file ?? emptyFile
  );
  const [actualFile, setActualFile] = useState<File | undefined>(undefined);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", actualFile as File);

    const response = await uploadFileAPI(formData);

    if (response.length === 0) {
      throw new Error(
        "Can't retrieve the uploaded file information: " + response
      );
    }

    const updatedResource = {
      ...resource,
      title: title,
      resourceInfo: {
        file: response[0],
      },
    };

    onEditCompleted(updatedResource);
  };

  const handleViewFile = async () => {
    try {
      const response = await getFileAPI(file._id, resource.courseId, true);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (error: any) {
      alert("Failed to view file: " + error.message);
    }
  };

  const handleDownloadFile = async () => {
    try {
      const response = await getFileAPI(file._id, resource.courseId);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert("Failed to download file: " + error.message);
    }
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
            placeholder="Announcement title"
            required
          ></input>

          <input
            type="file"
            className="w-full mb-4"
            onChange={(e) => {
              setActualFile(e.target.files?.[0]);
            }}
            required
          />

          <div className="flex items-center justify-around mb-4 mt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
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

      <div className="flex flex-row items-center space-x-4 justify-center mb-4 mt-4">
        <IconifyIcon
          className="text-3xl text-gray-500"
          icon={fileIconByExtension(file.filename.split(".").pop() ?? "")}
        />

        <div className="">
          <h3
            className="text-base text-center pt-2 font-medium max-w-60 truncate"
            title={file.filename}
          >
            {file.filename}
          </h3>
        </div>
      </div>

      <div className="flex flex-row items-center justify-around mb-4">
        <button
          className="w-24 px-2 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400"
          onClick={(e) => {
            e.preventDefault();
            handleViewFile();
          }}
        >
          Xem
        </button>

        <button
          className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={(e) => {
            e.preventDefault();
            handleDownloadFile();
          }}
        >
          Tải về
        </button>
      </div>
    </div>
  );
};

export default DocumentResource;
