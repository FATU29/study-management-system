import React, { useState } from "react";

// File interface
interface File {
  id: string;
  name: string;
  dateModified: Date;
  url: string;
}

// MainDrive component
const MainDrive: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    {
      id: "1",
      name: "File 1",
      dateModified: new Date(),
      url: "https://example.com/file1",
    },
    {
      id: "2",
      name: "File 2",
      dateModified: new Date(),
      url: "https://example.com/file2",
    },
  ]);

  // Add file (For demonstration purposes, adds a dummy file)
  const addFile = () => {
    const newFile: File = {
      id: String(files.length + 1),
      name: `File ${files.length + 1}`,
      dateModified: new Date(),
      url: `https://example.com/file${files.length + 1}`,
    };
    setFiles([...files, newFile]);
  };

  // Delete file
  const deleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  // Share file
  const shareFile = (name: string) => {
    alert(`Sharing ${name}`);
  };

  return (
    <div className="container mx-auto py-4 h-screen">
      <div className="flex justify-start mb-4">
        <button
          onClick={addFile}
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
                  {file.dateModified.toLocaleString()}
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
