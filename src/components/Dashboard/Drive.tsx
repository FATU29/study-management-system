import React, { useState, useRef, useEffect } from "react";
import { getPersonalFilesAPI, uploadFileAPI, deleteFileAPI, getFileAPI, getLimitsAPI } from "../../services/fileForStorage";

// File interface
interface File {
  id: string;
  name: string;
  dateModified?: Date | string;
  url: string;
}

// MainDrive component
const MainDrive: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await getPersonalFilesAPI("sourceId=personal-storage");
        console.log(fetchedFiles);
        if (Array.isArray(fetchedFiles.data)) {
          setFiles(fetchedFiles.data.map((file: any) => ({
            id: file._id,
            name: file.filename,
            dateModified: file.uploadDate || new Date(),
            url: file.url
          })));
        } else {
          throw new Error("Fetched files is not an array");
        }
      } catch (error: any) {
        console.error('Error fetching files:', error);
      } finally {
      }
    };

    fetchFiles();
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFiles = event.target.files;
      if (!selectedFiles) return;

      setIsUploading(true);
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      const uploadedFiles = await uploadFileAPI(formData, "personal-storage");
      setFiles(prev => [...prev, ...uploadedFiles.map((file: any) => ({
        id: file._id,
        name: file.filename,
        dateModified: file.uploadDate || new Date(),
        url: file.url
      }))]);
    } catch (error: any) {
      console.error("Upload failed:", error);
      // Add error handling here
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addFile = () => {
    fileInputRef.current?.click();
  };

  // Delete file
  const deleteFile = async (id: string) => {
    try {
      await deleteFileAPI(id);
      setFiles(files.filter((file) => file.id !== id));
    } catch (error: any) {
      console.error('Error deleting file:', error);
    }
  };

  // Share file
  const shareFile = (name: string) => {
    alert(`Sharing ${name}`);
  };

  // Download file
  const downloadFile = async (id: string, filename: string) => {
    try {
      const response = await getFileAPI(id, "personal-storage", true);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      return response;
    }
    catch (error: any) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="container mx-auto py-4 h-screen">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.zip,.rar,.7z,
                .mp4,.mp3,.wav,.flac,.ogg,.avi,.mkv,.mov,.wmv,.flv,.webm"
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
                    : 'No date available'}
                </td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => downloadFile(file.id, file.name)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 no-underline"
                  >
                    Tải xuống
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
