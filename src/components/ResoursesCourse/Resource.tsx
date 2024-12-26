import React, { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import IconifyIcon from "../utils/icon";

interface FileProps {
  name: string;
  url: string;
  exercise?: { type: string; name: string; questions?: any[] }[];
  documents?: { name: string; url: string; type: string }[]; // Thêm tài liệu
}

interface ResourceDetailProps {
  lesson: FileProps;
  onBack: () => void;
}

const ResourceDetail: React.FC<ResourceDetailProps> = ({ lesson, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Quay lại
        </button>
        <div className="flex-grow text-center">
          <h2 className="text-2xl font-bold">{lesson.name}</h2>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Phần bài giảng */}
      <div className="mb-4">
        <ReactPlayer
          url={lesson.url}
          controls
          width="100%"
          height="360px"
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* Phần tài liệu */}
      {lesson.documents && lesson.documents.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Tài liệu</h3>
          <ul className="space-y-2">
            {lesson.documents.map((doc, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="material-icons text-blue-500 mr-2">
                    <IconifyIcon icon="mdi:file-document" className="text-blue-500 mr-2" />
                  </span>
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 no-underline"
                >
                  Tải về
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Phần bài tập */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Bài tập</h3>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Nộp bài tập
        </button>
      </div>

      {/* Modal nộp bài tập */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Exercise Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Nộp bài tập</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {uploadedFile
              ? `Đã thêm file: ${uploadedFile.name}`
              : "Thêm tệp tin"}
          </label>
          {!uploadedFile && (
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 cursor-pointer focus:outline-none"
            />
          )}
        </div>
        {uploadedFile && (
          <div className="mb-4">
            <button
              onClick={handleDeleteFile}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Xóa
            </button>
            <button
              onClick={() => alert("Edit functionality not implemented yet")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Sửa bài tập
            </button>
          </div>
        )}
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Đóng
        </button>
      </Modal>
    </div>
  );
};

export default ResourceDetail;
