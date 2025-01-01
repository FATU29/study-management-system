import { useState } from "react";
import {
  emptyFile,
  IDocumentResourceInfo,
  IFile,
} from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";
import IconifyIcon from "../utils/icon";
import { uploadFileAPI, getFileAPI } from "../../services/file";

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

    try {
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
    } catch (error: any) {
      alert("Failed to upload file: " + error.message);
    }
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

      <div className="flex flex-row items-end space-x-4 justify-center mb-4 mt-4">
        <IconifyIcon
          className="text-3xl text-gray-500"
          icon={fileIconByExtension(file.filename.split(".").pop() ?? "")}
        />

        <div className="">
          <h3 className="text-sm font-semibold">{file.filename}</h3>
        </div>
      </div>

      <div
        className="flex flex-row items-center justify-around mb-4"
        onClick={(e) => {
          e.preventDefault();
          handleViewFile();
        }}
      >
        <button className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md">
          View
        </button>

        <button
          className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            handleDownloadFile();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

const fileIconByExtension = (extension: string): string => {
  switch (extension) {
    case "txt":
      return "vscode-icons:file-type-text";
    case "pdf":
      return "vscode-icons:file-type-pdf2";
    case "doc":
    case "docx":
      return "vscode-icons:file-type-word";
    case "ppt":
    case "pptx":
      return "vscode-icons:file-type-powerpoint";
    case "xls":
    case "xlsx":
      return "vscode-icons:file-type-excel";
    case "zip":
      return "vscode-icons:file-type-zip";
    case "jpg":
    case "jpeg":
    case "png":
    case "svg":
      return "vscode-icons:file-type-image";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "vscode-icons:file-type-video";
    case "mp3":
    case "wav":
    case "ogg":
      return "vscode-icons:file-type-audio";
    case "js":
    case "jsx":
      return "vscode-icons:file-type-js-official";
    case "ts":
    case "tsx":
      return "vscode-icons:file-type-typescript-official";
    case "html":
      return "vscode-icons:file-type-html";
    case "css":
      return "vscode-icons:file-type-css";
    case "json":
      return "vscode-icons:file-type-json";
    case "xml":
      return "vscode-icons:file-type-xml";
    case "md":
      return "vscode-icons:file-type-markdown";
    case "c":
      return "vscode-icons:file-type-c3";
    case "c++":
    case "cpp":
      return "vscode-icons:file-type-cpp3";
    case "sql":
      return "vscode-icons:file-type-sql";
    case "py":
      return "vscode-icons:file-type-python";
    case "exe":
      return "vscode-icons:file-type-binary";
    default:
      return "vscode-icons:default-file";
  }
};

export default DocumentResource;
