import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography, Avatar, Divider } from '@mui/material';

interface UploadFileProps {
    isOpen: boolean;
    onClose: () => void;
}

const FileInfoModal: React.FC<UploadFileProps> = ({ isOpen, onClose }) => {
    const [fileTitle, setFileTitle] = useState<string>('Tiêu đề thư mục mẫu');
    const [fileContent, setFileContent] = useState<string>('Nội dung thư mục mẫu');

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="profile-modal-title"
            aria-describedby="profile-modal-description"
        >
            <Box // FOR THE MAIN MODAL
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    height: 600,
                    bgcolor: 'white',
                    //border: '2px solid #000',
                    boxShadow: 2,
                    p: 4,
                    display: 'flow',
                    borderRadius: 8,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }} gutterBottom>
                    <span style={{ marginRight: '8px', cursor: 'pointer' }} onClick={onClose}>&larr;</span> Tên Môn Học
                </Typography>

                <Box>
                    <TextField
                        label="Tiêu đề"
                        value={fileTitle}
                        onChange={(e) => setFileTitle(e.target.value)}
                        margin="normal"
                        fullWidth
                        sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
                    />

                    <TextField
                        label="Nội dung"
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        margin="normal"
                        fullWidth
                        sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
                    />
                </Box>



                <Box
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 4,
                        padding: 2,
                        textAlign: 'center',
                        marginTop: 2,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'auto', // Adjust height to fit the modal without touching the buttons
                        overflow: 'hidden',
                    }}
                    onClick={() => document.getElementById('fileInput')?.click()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                            // TODO: Handle file upload
                            alert(`File ${file.name} uploaded successfully`);
                        }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Avatar sx={{ bgcolor: '#ccc', mb: 1 }}>
                        <i className="fas fa-upload"></i>
                    </Avatar>
                    <Typography variant="body1" color="textSecondary">
                        Kéo và thả tệp vào đây hoặc nhấp để chọn tệp từ máy tính của bạn
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Hỗ trợ tải lên một hoặc nhiều tệp. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
                    </Typography>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                // TODO: Handle file upload
                                const uploadedFile = {
                                    name: file.name,
                                    url: URL.createObjectURL(file),
                                };
                                alert(`File ${file.name} uploaded successfully`);
                            }
                        }}
                    />
                </Box>

                <Box sx={{
                    // border: '1px solid #ff0099',
                    position: 'absolute',
                    bottom: 16,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // TODO: Add save logic here
                            alert('Tải lên và lưu thành công');
                            onClose();
                        }}
                    >
                        Hoàn Tất
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            const confirmed = window.confirm('Bạn có chắc chắn muốn xoá không?');
                            if (confirmed) {
                                // TODO: Add delete logic here
                                alert('Xoá thành công');
                                onClose();
                            } else {
                                return;
                            }
                            onClose();
                        }}
                    >
                        Huỷ
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FileInfoModal;