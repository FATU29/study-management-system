import { useContext, useEffect, useState } from "react";
import { ICourseResource, IFile } from "../../types/resourceType";
import { CourseContext, StudentDetailType } from "../../pages/DetailCoursePage";
import { getSubmissionsAPI } from "../../services/resourcesCourse";
import ReactModal from "react-modal";
import { FileLimitsResponse } from "../../services/typeForService/resourceType";
import { displayFiles } from "./AssignmentResource";
import { deleteFileAPI, getFileAPI, uploadFileAPI } from "../../services/file";
import React from "react";
import IconifyIcon from "../utils/icon";
import { ROLE_TYPE } from "../../types/roleType";
import JSZip from "jszip";

type AssignmentSubmissionProps = {
  resource: ICourseResource;
  fileLimits?: FileLimitsResponse;
};

type FileWithId = File & { _id?: string };
type IFileWithUploaderId = IFile & { uploaderId?: string };

const AssignmentSubmission: React.FC<AssignmentSubmissionProps> = ({
  resource,
  fileLimits,
}) => {
  const courseContext = useContext(CourseContext);
  const { courseSlug, studentDetails, currentUserId, currentUserRole } =
    courseContext;

  const isLoadingAllStudentsSubmission = currentUserRole === ROLE_TYPE.TEACHER;

  // For USER
  const [submittedFiles, setSubmittedFiles] = useState<IFile[] | undefined>(
    undefined
  );
  const [hasLoadedFilesOnce, setHasLoadedFilesOnce] = useState(false);
  const [submittingFiles, setSubmittingFiles] = useState<FileWithId[]>([]);

  // For TEACHER
  const [allStudentsSubmissions, setAllStudentsSubmissions] = useState<
    IFileWithUploaderId[]
  >([]);
  const submittedStudentIds = allStudentsSubmissions
    .map((file) => file.uploaderId)
    .filter((id) => id !== undefined);
  const [currentStudentIdToView, setCurrentStudentIdToView] = useState<
    string | undefined
  >(undefined);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isInnerViewModalOpen, setIsInnerViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      if (isLoadingAllStudentsSubmission) {
        setSubmittedFiles([]);
        return;
      }

      try {
        const submissions = await getSubmissionsAPI(
          courseSlug,
          resource._id,
          currentUserId
        );
        setSubmittedFiles(submissions);
      } catch (error: any) {
        console.log("Error in fetch Submissions: ", error.message);
      }
    };

    fetchSubmission();
  }, []);

  const limitFileSizeDescription = fileLimits
    ? `${
        fileLimits.maxFileSize >= 1024 * 1024
          ? fileLimits.maxFileSize / 1024 / 1024
          : fileLimits.maxFileSize / 1024
      } ${fileLimits.maxFileSize >= 1024 * 1024 ? "MB" : "KB"}`
    : "";

  const handleLoadAllStudentsSubmission = async () => {
    const allStudentsSubmissions: IFileWithUploaderId[] = [];
    for (const studentDetail of studentDetails) {
      try {
        const submissions = await getSubmissionsAPI(
          courseSlug,
          resource._id,
          studentDetail._id
        );
        const submissionsWithUploaderId = submissions.map((file) => {
          const fileWithUploaderId = file as IFileWithUploaderId;
          fileWithUploaderId.uploaderId = studentDetail._id;
          return fileWithUploaderId;
        });
        allStudentsSubmissions.push(...submissionsWithUploaderId);
      } catch (error: any) {
        console.log("Error in fetch Submissions: ", error.message);
      }
    }
    setAllStudentsSubmissions(allStudentsSubmissions);
  };

  const [loadCount, setLoadCount] = useState(0); // For testing purpose
  const loadFile = async (file: IFile) => {
    try {
      const response = await getFileAPI(file._id, resource._id, true);
      const blob = await response.blob();
      const fileFromBlob = new File([blob], file.filename, {
        type: file.mimetype,
      });
      const fileWithId = fileFromBlob as FileWithId;
      fileWithId._id = file._id;
      setLoadCount((prev) => prev + 1);
      return fileWithId;
    } catch (error: any) {
      console.log("Error in loadStudentSubmittedFiles: ", error.message);
    }
  };

  const loadPrevioulySubmittedFiles = async () => {
    if (!submittedFiles) {
      return;
    }

    if (!hasLoadedFilesOnce) {
      // submittedFiles.forEach((file) => {
      //   const loadPromise = loadFile(file);
      //   loadPromise.then((fileWithId) => {
      //     if (fileWithId) {
      //       setSubmittingFiles([...submittingFiles, fileWithId]);
      //     }
      //   });
      // });

      const loadedFiles: FileWithId[] = [];
      for (const file of submittedFiles) {
        const fileWithId = await loadFile(file);
        if (fileWithId) {
          loadedFiles.push(fileWithId);
        }
      }
      setSubmittingFiles([...submittingFiles, ...loadedFiles]);
      setHasLoadedFilesOnce(true);
    } else {
      const loadedFiles = submittingFiles.filter((file) => file._id);
      const unloadedSubmittedFiles = submittedFiles.filter(
        (file) => !loadedFiles.find((f) => f._id === file._id)
      );

      // Load unloaded files
      const newLoadedFile: FileWithId[] = [];
      for (const file of unloadedSubmittedFiles) {
        const fileWithId = await loadFile(file);
        if (fileWithId) {
          newLoadedFile.push(fileWithId);
        }
      }

      // Remove unloaded files in "submittingFiles" and add new loaded files
      setSubmittingFiles([...loadedFiles, ...newLoadedFile]);

      // unloadedSubmittedFiles.forEach(async (file) => {
      //   try {
      //     const response = await getFileAPI(file._id, resource._id, true);
      //     const blob = await response.blob();
      //     const fileFromBlob = new File([blob], file.filename, {
      //       type: file.mimetype,
      //     });
      //     const fileWithId = fileFromBlob as FileWithId;
      //     fileWithId._id = file._id;
      //     setSubmittingFiles([...submittingFiles, fileWithId]);
      //   } catch (error: any) {
      //     console.log("Error in loadStudentSubmittedFiles: ", error.message);
      //   }
      // });
    }
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    if (submittingFiles.length === 0) {
      alert("Vui lòng chọn ít nhất một tệp để nộp!");
      return;
    }

    if (fileLimits) {
      if (submittingFiles.length > fileLimits.maxFileCount) {
        alert(
          `Số lượng tệp đính kèm không được vượt quá ${fileLimits.maxFileCount}!\n(số lượng hiện tại là ${submittingFiles.length})
          \nVui lòng cân nhắc xóa một số tệp đính kèm hiện tại.`
        );
        return;
      }

      const overweightFiles = submittingFiles.filter(
        (file) => file.size > fileLimits.maxFileSize
      );
      if (overweightFiles.length > 0) {
        alert(
          `Các tệp sau không được tải lên vì kích thước vượt quá giới hạn:${overweightFiles.map(
            (file) =>
              `\n- ${file.name} (${(file.size / 1024).toFixed(0)} KB hay ${(
                file.size /
                1024 /
                1024
              ).toFixed(2)} MB)`
          )}
          \nKích thước tệp tối đa là ${limitFileSizeDescription}
          \nVui lòng cân nhắc thay đổi các tệp đính kèm trên.`
        );
        return;
      }
    }

    if (submittedFiles && submittedFiles.length !== 0) {
      // const confirmText = window.confirm(
      //   "Bạn có chắc chắn muốn gửi lại bài nộp không? Bài nộp cũ sẽ bị thay thế!"
      // );
      // if (!confirmText) {
      //   return;
      // }

      // Delete old files
      const preservedFiles: IFile[] = [];
      for (const file of submittedFiles) {
        const existingFileWithMatchingId = submittingFiles.find(
          (f) => f._id === file._id
        );
        if (!existingFileWithMatchingId) {
          try {
            console.log("Trying to delete file: ", file._id);
            await deleteFileAPI(file._id);
          } catch (error: any) {
            console.log(
              "Error in delete file: (oh no) ",
              JSON.stringify(error)
            );
          }
        } else {
          preservedFiles.push(file);
        }
      }
      setSubmittedFiles(() => preservedFiles);
    }

    const newFilesToUpload = submittingFiles.filter((file) => !file._id);

    if (newFilesToUpload.length !== 0) {
      const newlyUploadedFileInfo: IFile[] = [];

      if (!fileLimits || newFilesToUpload.length <= fileLimits.maxFileCount) {
        const formData = new FormData();
        newFilesToUpload.forEach((file) => {
          formData.append("file", file);
        });
        try {
          const newFilesInfo = await uploadFileAPI(formData, resource._id);

          if (newFilesInfo.length === 0) {
            throw new Error(
              "Can't retrieve the uploaded file information: " + newFilesInfo
            );
          }

          newlyUploadedFileInfo.push(...newFilesInfo);
        } catch (error: any) {
          alert("Failed to upload file: " + error.message);
          return;
        }
      } else {
        for (
          let i = 0;
          i < Math.floor(newFilesToUpload.length / fileLimits.maxFileCount);
          i++
        ) {
          const formData = new FormData();
          const filesToUpload = newFilesToUpload.slice(
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

            newlyUploadedFileInfo.push(...newFilesInfo);
          } catch (error: any) {
            alert("Failed to upload file: " + error.message);
            return;
          }
        }
      }
      setSubmittedFiles((prev) => [...(prev ?? []), ...newlyUploadedFileInfo]);
    }

    // setSubmittingFiles([]);
    setIsSubmitModalOpen(false);
  };

  const handleNewAttachmentsAdded = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    const overweightFiles: File[] = [];
    const validFiles: File[] = [];
    newFiles.forEach((file) => {
      if (fileLimits && file.size > fileLimits.maxFileSize) {
        overweightFiles.push(file);
      } else {
        validFiles.push(file);
      }
    });
    setSubmittingFiles([...submittingFiles, ...validFiles]);
    if (overweightFiles.length > 0) {
      alert(
        `Các tệp sau không được tải lên vì kích thước vượt quá giới hạn:${overweightFiles.map(
          (file) =>
            `\n- ${file.name} (${(file.size / 1024).toFixed(0)} KB hay ${(
              file.size /
              1024 /
              1024
            ).toFixed(2)} MB)`
        )}`
      );
    }
    e.target.value = "";
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
      setSubmittingFiles(submittingFiles.filter((f) => f !== file));
    } else {
    }
  };

  const handleViewAllStudentsSubmission = async () => {
    await handleLoadAllStudentsSubmission();
    setIsViewModalOpen(true);
  };

  const handleDownloadFilesAsZipFor = async (
    studentDetail: StudentDetailType
  ) => {
    const filesToDownload = allStudentsSubmissions.filter(
      (file) => file.uploaderId === studentDetail._id
    );

    if (filesToDownload.length === 0) {
      alert("Không có tệp nào để tải về!");
      return;
    }

    const downloadedFiles: File[] = [];
    for (const file of filesToDownload) {
      const fileId = file._id;
      try {
        const response = await getFileAPI(fileId, resource._id, true);
        const blob = await response.blob();
        const fileFromBlob = new File([blob], file.filename, {
          type: file.mimetype,
        });
        downloadedFiles.push(fileFromBlob);
      } catch (error: any) {
        console.log("Failed to download file: " + error.message);
      }
    }

    try {
      const zip = new JSZip();
      const duplicatedFileNamesCount = new Map<string, number>();
      downloadedFiles.forEach((file) => {
        const currentNameCount = duplicatedFileNamesCount.get(file.name) ?? 0;
        if (currentNameCount > 0) {
          zip.file(`${file.name}(${currentNameCount})`, file, {
            binary: true,
          });
        } else {
          zip.file(file.name, file);
        }
        duplicatedFileNamesCount.set(file.name, currentNameCount + 1);
      });
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      });

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resource._id}_${studentDetail._id}_${studentDetail.firstName}${studentDetail.lastName}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert("Failed to zip the file to download: " + error.message);
    }
  };

  if (!submittedFiles) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-around mt-2">
        {currentUserRole === ROLE_TYPE.USER ? (
          <>
            {submittedFiles.length !== 0 && (
              <>
                <button
                  className="px-2 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsViewModalOpen(true);
                  }}
                >
                  Xem bài nộp
                </button>

                <SingleStudentSubmission
                  isOpen={isViewModalOpen}
                  onClose={() => setIsViewModalOpen(false)}
                  files={submittedFiles}
                  onViewFile={handleViewFile}
                  onDownloadFile={handleDownloadFile}
                />
              </>
            )}

            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                loadPrevioulySubmittedFiles();
                setIsSubmitModalOpen(true);
              }}
            >
              {submittedFiles.length === 0 ? "Nộp bài" : "Chỉnh sửa bài nộp"}
            </button>

            <StudentSubmissionUpload
              isOpen={isSubmitModalOpen}
              onClose={() => setIsSubmitModalOpen(false)}
              files={submittingFiles}
              fileLimits={fileLimits}
              onFilesAdded={handleNewAttachmentsAdded}
              onFileRemoved={handleRemoveFile}
              onViewFile={handleViewFile}
              onDownloadFile={handleDownloadFile}
              onSubmitted={handleSubmission}
            />

            {/* <p>Load times: {loadCount}</p> */}
          </>
        ) : currentUserRole === ROLE_TYPE.TEACHER ||
          currentUserRole === ROLE_TYPE.ADMIN ? (
          <>
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              // onClick={async (e) => {
              //   e.preventDefault();
              //   await handleLoadAllStudentsSubmission();
              //   setIsViewModalOpen(true);
              //   console.log(
              //     "allStudentsSubmissions: ",
              //     allStudentsSubmissions.length
              //   );
              // }}
              onClick={handleViewAllStudentsSubmission}
            >
              Xem các bài nộp
            </button>

            <MultipleStudentsSubmission
              isOpen={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              studentDetails={studentDetails.filter((student) => {
                return submittedStudentIds.includes(student._id);
              })}
              // studentDetails={studentDetails}
              onDetailClicked={(studentDetail) => {
                setCurrentStudentIdToView(studentDetail._id);
                setIsInnerViewModalOpen(true);
              }}
              onDownloadAll={(studentDetail) => {
                setCurrentStudentIdToView(studentDetail._id);
                handleDownloadFilesAsZipFor(studentDetail);
              }}
            />

            <SingleStudentSubmission
              isOpen={isInnerViewModalOpen}
              onClose={() => setIsInnerViewModalOpen(false)}
              files={
                currentStudentIdToView
                  ? allStudentsSubmissions.filter(
                      (file) => file.uploaderId === currentStudentIdToView
                    )
                  : []
              }
              onViewFile={handleViewFile}
              onDownloadFile={handleDownloadFile}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      {/* <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => {}}
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      ></ReactModal> */}
    </div>
  );
};

const SingleStudentSubmission: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  files: IFile[];
  onViewFile: (file: IFile | File) => void;
  onDownloadFile: (file: IFile) => void;
}> = ({ isOpen, onClose, files, onViewFile, onDownloadFile }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-300"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div>
        <div className="flex flex-row items-center justify-between mb-2">
          <button
            onClick={onClose}
            title="Quay lại"
            className="px-2 py-2 size-10 bg-blue-300 text-white rounded-md hover:bg-blue-400"
          >
            <div className="flex items-center justify-around">
              <IconifyIcon icon="bi:arrow-left" />
            </div>
          </button>

          <h2 className="my-2 text-xl font-semibold mx-12">
            Danh sách các bài nộp
          </h2>

          <div className="px-2 py-2 size-10" />
        </div>

        {/* <h1 className="text-xl font-semibold mb-4">Danh sách các bài nộp</h1> */}
        {displayFiles(files, onViewFile, onDownloadFile)}
      </div>
    </ReactModal>
  );
};

const MultipleStudentsSubmission: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  studentDetails: StudentDetailType[];
  onDetailClicked: (studentDetail: StudentDetailType) => void;
  onDownloadAll: (studentDetail: StudentDetailType) => void;
}> = ({ isOpen, onClose, studentDetails, onDetailClicked, onDownloadAll }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-300"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div>
        <div className="flex flex-row items-center justify-between mb-2">
          <button
            onClick={onClose}
            title="Quay lại"
            className="px-2 py-2 size-10 bg-blue-300 text-white rounded-md hover:bg-blue-400"
          >
            <div className="flex items-center justify-around">
              <IconifyIcon icon="bi:arrow-left" />
            </div>
          </button>

          <h2 className="my-2 text-xl font-semibold mx-4">
            Các học sinh nộp bài
          </h2>

          <div className="px-2 py-2 size-10" />
        </div>

        {studentDetails.length === 0 && (
          <div className="flex flex-row items-center justify-center mb-2">
            <div className="text-lg text-gray-500">
              Chưa có học sinh nào nộp
            </div>
          </div>
        )}

        <div>
          {studentDetails.map((studentDetail) => (
            <div
              key={studentDetail._id}
              className="flex flex-row items-center justify-between mb-2"
            >
              <div className="text-lg font-normal">
                {studentDetail.firstName} {studentDetail.lastName}
              </div>

              {/* <button
                className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  onDetailClicked(studentDetail);
                }}
              >
                Xem bài nộp
              </button> */}

              <div className="flex flex-row items-center space-x-2 justify-center">
                <button
                  className="px-2 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400"
                  title="Xem"
                  onClick={(e) => {
                    e.preventDefault();
                    onDetailClicked(studentDetail);
                  }}
                >
                  <IconifyIcon icon="bi:eye" />
                </button>

                <button
                  className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  title="Tải về"
                  onClick={(e) => {
                    e.preventDefault();
                    onDownloadAll(studentDetail);
                  }}
                >
                  <IconifyIcon icon="bi:download" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  );
};

const StudentSubmissionUpload: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  fileLimits?: FileLimitsResponse;
  onFilesAdded: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemoved: (file: File | IFile) => void;
  onViewFile: (file: IFile | File) => void;
  onDownloadFile: (file: IFile) => void;
  onSubmitted: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({
  isOpen,
  onClose,
  files,
  fileLimits,
  onFilesAdded,
  onFileRemoved,
  onViewFile,
  onDownloadFile,
  onSubmitted,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-300"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div>
        <div className="flex flex-row items-center justify-between mb-2">
          <button
            onClick={onClose}
            title="Quay lại"
            className="px-2 py-2 size-10 bg-blue-300 text-white rounded-md hover:bg-blue-400"
          >
            <div className="flex items-center justify-around">
              <IconifyIcon icon="bi:arrow-left" />
            </div>
          </button>

          <h2 className="my-2 text-xl font-semibold mx-12">
            Thêm bài nộp của bạn
          </h2>

          <div className="px-2 py-2 size-10" />
        </div>

        {/* <h1 className="text-xl font-semibold mb-4">Thêm bài nộp của bạn</h1> */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitted(e);
          }}
        >
          <input
            type="file"
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            multiple
            onChange={onFilesAdded}
          />

          {fileLimits && (
            <div className="mb-2">
              <div className="text-sm text-gray-500">
                (Số lượng tập tin nộp tối đa là {fileLimits?.maxFileCount})
              </div>

              <div className="text-sm text-gray-500">
                (Kích thước mỗi tập tin nộp tối đa là{" "}
                {fileLimits.maxFileSize >= 1024 * 1024
                  ? fileLimits.maxFileSize / 1024 / 1024
                  : fileLimits.maxFileSize / 1024}{" "}
                {fileLimits.maxFileSize >= 1024 * 1024 ? "MB" : "KB"})
              </div>
            </div>
          )}

          {displayFiles(files, onViewFile, onDownloadFile, true, onFileRemoved)}

          <div className="flex flex-row items-center justify-around mt-1 mb-4">
            <button
              className="w-24 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              type="submit"
            >
              Nộp bài
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

// const ModalWrapper: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }> = ({ isOpen, onClose, children }) => {
//   return (
//     <ReactModal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto border border-gray-300"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//     >
//       {children}
//     </ReactModal>
//   );
// };

export default AssignmentSubmission;
