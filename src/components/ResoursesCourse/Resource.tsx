import React, { useState } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal"; // Cần cài đặt bằng `npm install react-modal`

interface FileProps {
  name: string;
  url: string;
  exercise?: { name: string; fileUrl?: string }[];
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
      {/* Nút Quay lại */}
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back
      </button>

      {/* Tiêu đề bài giảng */}
      <h2 className="text-2xl font-bold mb-4">{lesson.name}</h2>

      {/* Video bài giảng */}
      <div className="mb-4">
        <ReactPlayer
          url={lesson.url}
          controls
          width="100%"
          height="360px"
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* Phần bài tập */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Exercises</h3>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Open Exercise Modal
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Exercise Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Submit Your Exercise</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {uploadedFile
              ? `Uploaded File: ${uploadedFile.name}`
              : "Upload a file"}
          </label>
          {!uploadedFile && (
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          )}
        </div>
        {uploadedFile && (
          <div className="mb-4">
            <button
              onClick={handleDeleteFile}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => alert("Edit functionality not implemented yet")}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
          </div>
        )}
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ResourceDetail;
