import React, { useEffect, useState } from "react";
import { IAssignmentResourceInfo, IFile } from "../../types/resourceType";
import { InnerResourceDetailProps } from "./ResourceDetail";
import IconifyIcon from "../utils/icon";
import { uploadFileAPI, getFileAPI, getLimitsAPI } from "../../services/file";
import { fileIconByExtension } from "../../helpers/fileIconByExtension";
import { FileLimitsResponse } from "../../services/typeForService/resourceType";

export const MAXIMUM_ATTACHMENT_COUNT_PER_ASSIGNMENT = 10;

const AssignmentResource: React.FC<InnerResourceDetailProps> = ({
  resource,
  isEditing,
  onEditCompleted,
}) => {
  const [title, setTitle] = useState<string>(resource.title);
  const [description, setDescription] = useState<string>(
    (resource.resourceInfo as IAssignmentResourceInfo).description ?? ""
  );
  const [attachments] = useState<IFile[]>(
    (resource.resourceInfo as IAssignmentResourceInfo).attachments ?? []
  );
  const [deletingAttachments, setDeletingAttachments] = useState<IFile[]>([]);
  const [openDate, setOpenDate] = useState<Date>(
    (resource.resourceInfo as IAssignmentResourceInfo).openDate ?? new Date()
  );
  const [dueDate, setDueDate] = useState<Date>(
    (resource.resourceInfo as IAssignmentResourceInfo).dueDate
  );
  const [fileLimits, setFileLimits] = useState<FileLimitsResponse | undefined>(
    undefined
  );
  const [actualFiles, setActualFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isEditing) {
      const fetchFileSizeLimit = async () => {
        try {
          const fileLimits = await getLimitsAPI();
          setFileLimits(fileLimits);
        } catch (error: any) {
          alert("Failed to fetch file size limit: " + error.message);
        }
      };

      fetchFileSizeLimit();
    }
  }, [isEditing]);

  const handleSubmit = async () => {
    const finalAttachmentCount =
      attachments.length + actualFiles.length - deletingAttachments.length;
    if (finalAttachmentCount > MAXIMUM_ATTACHMENT_COUNT_PER_ASSIGNMENT) {
      alert(
        `Số lượng tệp đính kèm không được vượt quá ${MAXIMUM_ATTACHMENT_COUNT_PER_ASSIGNMENT}!\n(số lượng hiện tại là ${finalAttachmentCount})
        \nVui lòng cân nhắc xóa một số tệp đính kèm hiện tại.`
      );
      return;
    }

    let currentAttachments: IFile[] = [...attachments];

    if (actualFiles.length !== 0) {
      if (!fileLimits || actualFiles.length <= fileLimits.maxFileCount) {
        const formData = new FormData();
        actualFiles.forEach((file) => {
          formData.append("file", file);
        });
        try {
          const newFilesInfo = await uploadFileAPI(formData, resource._id);

          if (newFilesInfo.length === 0) {
            throw new Error(
              "Can't retrieve the uploaded file information: " + newFilesInfo
            );
          }

          currentAttachments.push(...newFilesInfo);
        } catch (error: any) {
          alert("Failed to upload file: " + error.message);
          return;
        }
      } else {
        for (
          let i = 0;
          i < Math.floor(actualFiles.length / fileLimits.maxFileCount);
          i++
        ) {
          const formData = new FormData();
          const filesToUpload = actualFiles.slice(
            i * fileLimits.maxFileCount,
            (i + 1) * fileLimits.maxFileCount
          );

          filesToUpload.forEach((file) => {
            formData.append("file", file);
          });

          try {
            const newFilesInfo = await uploadFileAPI(formData, resource._id);

            if (newFilesInfo.length === 0) {
              throw new Error(
                "Can't retrieve the uploaded file information: " + newFilesInfo
              );
            }

            currentAttachments.push(...newFilesInfo);
          } catch (error: any) {
            alert("Failed to upload file: " + error.message);
            return;
          }
        }
      }
    }

    if (deletingAttachments.length !== 0) {
      currentAttachments = currentAttachments.filter(
        (file) => !deletingAttachments.includes(file)
      );
    }

    const updatedResource = {
      ...resource,
      title: title,
      resourceInfo: {
        description: description,
        attachments: currentAttachments,
        openDate: openDate,
        dueDate: dueDate,
      },
    };

    onEditCompleted(updatedResource);
  };

  const handleViewFile = async (file: File | IFile) => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);

      window.open(url, "_blank");
      return;
    }

    try {
      const response = await getFileAPI(file._id, resource._id, true);

      const blob = await response.blob();
      const fileFromBlob = new File([blob], file.filename, {
        type: file.mimetype,
      });
      const url = URL.createObjectURL(fileFromBlob);

      window.open(url, "_blank");
      URL.revokeObjectURL(url);
    } catch (error: any) {
      alert("Failed to view file: " + error.message);
    }
  };

  const handleDownloadFile = async (file: IFile) => {
    try {
      const response = await getFileAPI(file._id, resource._id);

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

  const handleRemoveFile = (file: File | IFile) => {
    if (file instanceof File) {
      setActualFiles(actualFiles.filter((f) => f !== file));
    } else {
      setDeletingAttachments([...deletingAttachments, file]);
    }
  };

  const handleRecoverRemovedFile = (file: IFile) => {
    setDeletingAttachments(deletingAttachments.filter((f) => f !== file));
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    if (e.target["validity"].valid) {
      setFunction(new Date(e.target.value));
    }
  };

  const handleNewAttachmentsAdded = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setActualFiles([...actualFiles, ...newFiles]);
    e.target.value = "";
  };

  if (isEditing) {
    return (
      <div>
        <form
          className="max-h-96 overflow-y-auto px-2"
          onSubmit={(e) => {
            e.preventDefault();

            if (dueDate <= openDate) {
              alert("Thời gian đóng phải sau thời gian mở");
              return;
            }

            if (dueDate <= new Date()) {
              alert("Thời gian đóng phải sau thời gian hiện tại");
              return;
            }

            handleSubmit();
          }}
        >
          <input
            className="w-full mb-4 text-2xl font-bold"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Assignment title"
            required
          ></input>

          <label className="font-semibold" htmlFor="Description">
            Mô tả
          </label>

          <textarea
            className="w-full mb-4 mt-1 text-justify"
            id="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Assignment description"
            rows={5}
          ></textarea>

          <label className="font-semibold" htmlFor="OpenDate">
            Thời gian mở:{" "}
            <span className="font-medium">{dateAsString(openDate)}</span>
          </label>

          <div className="flex flex-row items-center justify-around">
            <input
              className="w-3/5 px-4 py-1 mb-4 mt-1 border border-gray-300 rounded-md"
              id="OpenDate"
              type="datetime-local"
              value={datetimeLocalValueOf(openDate)}
              onChange={(e) => handleDateChange(e, setOpenDate)}
              placeholder="Assignment open date"
              required
            />
          </div>

          <label className="font-semibold" htmlFor="DueDate">
            Thời gian đóng:{" "}
            <span className="font-medium">{dateAsString(dueDate)}</span>
          </label>

          <div className="flex flex-row items-center justify-around">
            <input
              className="w-3/5 px-4 py-1 mb-4 mt-1 border border-gray-300 rounded-md"
              id="DueDate"
              type="datetime-local"
              value={datetimeLocalValueOf(dueDate)}
              onChange={(e) => handleDateChange(e, setDueDate)}
              placeholder="Assignment open date"
              required
            />
          </div>

          {attachments.length > 0 && (
            <div className="mb-4">
              <label className="font-semibold" htmlFor="newAttachments">
                Các tệp đính kèm trước đó (&times;
                {attachments.length - deletingAttachments.length})
              </label>

              {displayFiles(
                attachments,
                handleViewFile,
                undefined,
                true,
                handleRemoveFile,
                deletingAttachments,
                handleRecoverRemovedFile
              )}
            </div>
          )}

          <label className="font-semibold" htmlFor="newAttachments">
            Các tệp đính kèm {attachments.length > 0 ? "bổ sung" : ""} (&times;
            {actualFiles.length})
          </label>

          <input
            type="file"
            id="newAttachments"
            className="w-full mt-2"
            onChange={handleNewAttachmentsAdded}
            multiple
          />

          {fileLimits && (
            <p className="text-sm text-gray-500">
              {`(Kích thước tối đa của mỗi tập tin là ${
                fileLimits.maxFileSize / 1024 / 1024
              } MB)`}
            </p>
          )}

          {displayFiles(
            actualFiles,
            handleViewFile,
            undefined,
            true,
            handleRemoveFile
          )}

          <p className="text-sm text-gray-500">
            {`(Số lượng tệp đính kèm tối đa trong mỗi bài tập là ${MAXIMUM_ATTACHMENT_COUNT_PER_ASSIGNMENT})`}
          </p>

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
    <div className="max-h-96 overflow-y-auto px-2">
      <div className="flex-grow text-center">
        <h2 className="text-2xl font-bold">{resource.title}</h2>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-base text-justify pt-2">{description}</h3>
      </div>

      <p className="font-semibold">
        Thời gian mở:{" "}
        <span className="font-medium">{dateAsString(openDate)}</span>
      </p>

      <p className="font-semibold">
        Thời gian đóng:{" "}
        <span className="font-medium">{dateAsString(dueDate)}</span>
      </p>

      {attachments.length > 0 && (
        <>
          <div className="font-semibold">Các tệp đính kèm</div>

          {displayFiles(attachments, handleViewFile, handleDownloadFile)}
        </>
      )}

      {/* <div
        className="flex flex-row items-center justify-around mb-4"
        onClick={(e) => {
          e.preventDefault();
          handleViewFile();
        }}
      >
        <button className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md">
          Xem
        </button>

        <button
          className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            handleDownloadFile();
          }}
        >
          Tải về
        </button>
      </div> */}
    </div>
  );
};

const displayFiles = (
  files: File[] | IFile[],
  onView: (file: File | IFile) => void,
  onDownload?: (file: IFile) => void,
  isRemovable?: boolean,
  onRemove?: (file: File | IFile) => void,
  temporaryRemoveFiles?: IFile[],
  onRecoveringRemovedFile?: (file: IFile) => void
) => {
  return (
    <div className="flex flex-col w-full">
      {files.map((file, index) => (
        <div className="flex flex-row items-center space-x-4 justify-center">
          <IconifyIcon
            className="text-3xl text-gray-500"
            icon={fileIconByExtension(
              (file instanceof File ? file.name : file.filename)
                .split(".")
                .pop() ?? ""
            )}
          />

          <div className="">
            <h3
              className={`text-base text-center pt-2 truncate w-60 ${
                !(file instanceof File) &&
                temporaryRemoveFiles &&
                temporaryRemoveFiles.includes(file)
                  ? "line-through font-light text-gray-500"
                  : "font-medium"
              }`}
              title={file instanceof File ? file.name : file.filename}
            >
              {file instanceof File ? file.name : file.filename}
            </h3>
          </div>

          <div className="flex flex-row items-center space-x-2 justify-center">
            <button
              className="px-2 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400"
              title="Xem"
              onClick={(e) => {
                e.preventDefault();
                onView(file);
              }}
            >
              <IconifyIcon icon="bi:eye" />
            </button>

            {isRemovable &&
              (!(file instanceof File) &&
              temporaryRemoveFiles &&
              temporaryRemoveFiles.includes(file) ? (
                <button
                  className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  title="Khôi phục"
                  onClick={(e) => {
                    e.preventDefault();
                    onRecoveringRemovedFile &&
                      onRecoveringRemovedFile(file as IFile);
                  }}
                >
                  <IconifyIcon icon="mdi:file-restore" />
                </button>
              ) : (
                <button
                  className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  title="Xóa"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove && onRemove(file);
                  }}
                >
                  <IconifyIcon icon="bi:trash" />
                </button>
              ))}

            {!(file instanceof File) && onDownload && (
              <button
                className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                title="Tải về"
                onClick={(e) => {
                  e.preventDefault();
                  onDownload(file);
                }}
              >
                <IconifyIcon icon="bi:download" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const dateAsString = (date: Date) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    return "chưa xác định";
  }

  const hours = validDate.getHours().toString().padStart(2, "0");
  const minutes = validDate.getMinutes().toString().padStart(2, "0");
  const day = validDate.getDate().toString().padStart(2, "0");
  const month = (validDate.getMonth() + 1).toString().padStart(2, "0");
  const year = validDate.getFullYear();
  // const ampm = validDate.getHours() >= 12 ? "PM" : "AM";

  return `${hours}h${minutes}, ${day}/${month}/${year}`;
};

const datetimeLocalValueOf = (date: Date) => {
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return "1900-01-01T00:00";
  }

  const hours = validDate.getHours().toString().padStart(2, "0");
  const minutes = validDate.getMinutes().toString().padStart(2, "0");
  const day = validDate.getDate().toString().padStart(2, "0");
  const month = (validDate.getMonth() + 1).toString().padStart(2, "0");
  const year = validDate.getFullYear();

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default AssignmentResource;
