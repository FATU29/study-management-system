import React, { useState, useRef, useEffect } from "react";
import {
  getPersonalFilesAPI,
  uploadFileAPI,
  deleteFileAPI,
} from "../../services/fileForStorage";

// File interface
interface File {
  id: string;
  name: string;
  dateModified?: Date | string;
  url: string;
}

// MainDrive component
const MainDrive: React.FC = () => {
  // const [files, setFiles] = useState<File[]>([
  //   {
  //     id: "1",
  //     name: "File 1",
  //     dateModified: new Date(),
  //     url: "https://example.com/file1",
  //   },
  //   {
  //     id: "2",
  //     name: "File 2",
  //     dateModified: new Date(),
  //     url: "https://example.com/file2",
  //   },
  // ]);

  // AI
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleGetPersonalFiles = async () => {
  //   try {
  //     const files = await getPersonalFilesAPI("sourceId=personal-storage");
  //     setFiles(files);
  //   } catch (error) {
  //     console.error("Get files failed:", error);
  //     // Add error handling here
  //   }
  // }

  const [files, setFiles] = useState<File[]>([]);
  // useEffect(() => {
  //   handleGetPersonalFiles();
  // }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const fetchedFiles = await getPersonalFilesAPI(
          "sourceId=personal-storage"
        );
        console.log(fetchedFiles);
        if (Array.isArray(fetchedFiles.data)) {
          setFiles(
            fetchedFiles.data.map((file: any) => ({
              id: file._id,
              name: file.filename,
              dateModified: file.uploadDate || new Date(),
              url: file.url,
            }))
          );
        } else {
          throw new Error("Fetched files is not an array");
        }
      } catch (error: any) {
        console.error("Error fetching files:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // AI
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const selectedFiles = event.target.files;
      if (!selectedFiles) return;

      setIsUploading(true);
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      const uploadedFiles = await uploadFileAPI(formData, "personal-storage");
      setFiles((prev) => [
        ...prev,
        ...uploadedFiles.map((file: any) => ({
          id: file._id,
          name: file.filename,
          dateModified: file.uploadDate || new Date(),
          url: file.url,
        })),
      ]);
    } catch (error: any) {
      console.error("Upload failed:", error);
      // Add error handling here
      setError(error.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // AI
  const addFile = () => {
    fileInputRef.current?.click();
  };

  // // Add file (For demonstration purposes, adds a dummy file)
  // const addFile = () => {
  //   const newFile: File = {
  //     id: String(files.length + 1),
  //     name: `File ${files.length + 1}`,
  //     dateModified: new Date(),
  //     url: `https://example.com/file${files.length + 1}`,
  //   };

  //   setFiles([...files, newFile]);
  // };

  // Delete file
  const deleteFile = async (id: string) => {
    try {
      await deleteFileAPI(id);
      setFiles(files.filter((file) => file.id !== id));
    } catch (error: any) {
      console.error("Error deleting file:", error);
      setError(error.message);
    }
  };

  // Share file
  const shareFile = (name: string) => {
    alert(`Sharing ${name}`);
  };

  return (
    <div className="container mx-auto py-4 h-screen">
      {/* AI */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.xlsx"
      />

      <div className="flex justify-start mb-4">
        <button
          onClick={addFile}
          disabled={isUploading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Thêm tệp
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-6rem)]">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tên</th>
              <th className="py-2 px-4 border-b">Ngày chỉnh sửa Modified</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody className="">
            {files.map((file) => (
              <tr key={file.id}>
                <td className="py-2 px-4 border-b">{file.name}</td>
                <td className="py-2 px-4 border-b">
                  {file.dateModified
                    ? new Date(file.dateModified).toLocaleString()
                    : "No date available"}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <a
                    href={file.url}
                    download={file.name}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 no-underline"
                  >
                    Tải xuống
                  </a>
                  <button
                    onClick={() => shareFile(file.name)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Chia sẻ
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainDrive;
