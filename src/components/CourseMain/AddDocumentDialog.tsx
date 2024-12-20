import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import { ResourceType } from "../types/class-resource";

interface AddDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  sectionLabel: string;
  onSubmit: (formData: {
    title: string;
    file: File | null;
    description: string;
    type: ResourceType;
  }) => void;
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({
  open,
  onClose,
  sectionLabel,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    file: null as File | null,
    description: '',
    type: 'document' as ResourceType
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      file: null,
      description: '',
      type: 'document'
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Thêm tài liệu mới</DialogTitle>
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Tiêu đề
              </Typography>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full p-2 border border-gray-200 rounded-md"
              />
            </Box>

            <Box>
              <Typography variant="body2" gutterBottom>
                Tải lên tài liệu
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
                className="w-full p-2 border border-gray-200 rounded-md"
              />
            </Box>

            <Box>
              <Typography variant="body2" gutterBottom>
                Mô tả
              </Typography>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-md h-24"
              />
            </Box>

            <Box display="flex" gap={1} justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Thêm tài liệu
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddDocumentDialog;