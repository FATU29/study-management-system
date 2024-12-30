import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, Typography, IconButton } from "@mui/material";
import { ResourceType } from "../types/class-resource";
import { getResourcesAPI, addResourceAPI, deleteResourceAPI, updateResourceAPI} from '../../services/resourcesCourse';
import IconifyIcon from "../utils/icon";

interface AddDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    videos: { title: string; url: string }[];
    documents: { title: string; file: File }[];
    exercises: { title: string; file: File }[];
  }) => void;
  slug: string;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({ open, onClose, onSubmit, slug }) => {
  const [formData, setFormData] = useState({
    title: "",
    videos: [] as { title: string; url: string }[],
    documents: [] as { title: string; file: File }[],
    exercises: [] as { title: string; file: File }[],
  });

  const handleAddVideo = () => {
    if (formData.videos.every((video) => video.title && video.url)) {
      setFormData((prev) => ({
        ...prev,
        videos: [...prev.videos, { title: "", url: "" }],
      }));
    } else {
      alert("Vui lòng điền đầy đủ thông tin cho tất cả các video trước khi thêm mới.");
    }
  };

  const handleAddDocument = () => {
    if (formData.documents.every((doc) => doc.title && doc.file)) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, { title: "", file: null as unknown as File }],
      }));
    } else {
      alert("Vui lòng điền đầy đủ thông tin cho tất cả các tài liệu trước khi thêm mới.");
    }
  };

  const handleAddExercise = () => {
    if (formData.exercises.every((exercise) => exercise.title && exercise.file)) {
      setFormData((prev) => ({
        ...prev,
        exercises: [...prev.exercises, { title: "", file: null as unknown as File }],
      }));
    } else {
      alert("Vui lòng điền đầy đủ thông tin cho tất cả các bài tập trước khi thêm mới.");
    }
  };

  const handleRemoveItem = (type: "videos" | "documents" | "exercises", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };
  const sectionLabel = "1.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Tiêu đề bài giảng không được để trống.");
      return;
    }

    try {
      const response = await addResourceAPI(slug, { ...formData, sectionLabel });
      alert("Thêm bài giảng thành công!");
      onSubmit?.(formData); 
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm bài giảng:", error);
      alert("Không thể thêm bài giảng. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Thêm Bài Giảng</DialogTitle>
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} className="w-96">
            <Box>
              <Typography variant="body2" gutterBottom>
                Tiêu đề Bài Giảng
              </Typography>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-md"
              />
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              {formData.videos.map((video, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                  <input
                    type="text"
                    placeholder="Tiêu đề video"
                    value={video.title}
                    onChange={(e) => {
                      const updatedVideos = [...formData.videos];
                      updatedVideos[index].title = e.target.value;
                      setFormData((prev) => ({ ...prev, videos: updatedVideos }));
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="url"
                    placeholder="URL video"
                    value={video.url}
                    onChange={(e) => {
                      const updatedVideos = [...formData.videos];
                      updatedVideos[index].url = e.target.value;
                      setFormData((prev) => ({ ...prev, videos: updatedVideos }));
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <IconButton onClick={() => handleRemoveItem("videos", index)}>
                    <IconifyIcon
                      icon="material-symbols:delete-outline-rounded"
                      width="20"
                      height="20"
                      style={{ color: "black" }}
                    />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={handleAddVideo}>Thêm Video</Button>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Tài Liệu
              </Typography>
              {formData.documents.map((doc, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                  <input
                    type="text"
                    placeholder="Tiêu đề tài liệu"
                    value={doc.title}
                    onChange={(e) => {
                      const updatedDocuments = [...formData.documents];
                      updatedDocuments[index].title = e.target.value;
                      setFormData((prev) => ({ ...prev, documents: updatedDocuments }));
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const updatedDocuments = [...formData.documents];
                        updatedDocuments[index].file = e.target.files[0];
                        setFormData((prev) => ({ ...prev, documents: updatedDocuments }));
                      }
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <IconButton onClick={() => handleRemoveItem("documents", index)}>
                    <IconifyIcon
                    icon="material-symbols:delete-outline-rounded"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                    />
                    
                  </IconButton>
                </Box>
              ))}
              <Button onClick={handleAddDocument}>Thêm Tài Liệu</Button>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Bài Tập
              </Typography>
              {formData.exercises.map((exercise, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                  <input
                    type="text"
                    placeholder="Tiêu đề bài tập"
                    value={exercise.title}
                    onChange={(e) => {
                      const updatedExercises = [...formData.exercises];
                      updatedExercises[index].title = e.target.value;
                      setFormData((prev) => ({ ...prev, exercises: updatedExercises }));
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const updatedExercises = [...formData.exercises];
                        updatedExercises[index].file = e.target.files[0];
                        setFormData((prev) => ({ ...prev, exercises: updatedExercises }));
                      }
                    }}
                    required
                    className="w-1/2 p-2 border border-gray-200 rounded-md"
                  />
                  <IconButton onClick={() => handleRemoveItem("exercises", index)}>
                    <IconifyIcon
                    icon="material-symbols:delete-outline-rounded"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                    />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={handleAddExercise}>Thêm Bài Tập</Button>
            </Box>

            <Box display="flex" gap={1} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined">
                Hủy
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Thêm bài giảng
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddDocumentDialog;
