import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography, Avatar, Divider } from '@mui/material';

interface ViewFileInfoProps {
    isOpen: boolean;
    onClose: () => void;
}

const FileInfoModal: React.FC<ViewFileInfoProps> = ({ isOpen, onClose }) => {
    const [fileTitle, setFileTitle] = useState<string>('Tiêu đề thư mục mẫu');
    const [fileContent, setFileContent] = useState<string>('Nội dung thư mục mẫu');

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="file-info-modal-title"
            aria-describedby="file-info-modal-description"
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
                    // display: 'flow',
                    borderRadius: 8,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }} gutterBottom>
                    <span style={{ marginRight: '8px', cursor: 'pointer' }} onClick={onClose}>&larr;</span> Tên Môn Học
                </Typography>

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

                <Typography variant="h6" gutterBottom>
                    Thư mục
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1 
                }}>
                    <Avatar sx={{ bgcolor: '#f5f5f5' }}>📄</Avatar>
                    <Typography sx={{ flexGrow: 1 }}>example_file.pdf</Typography>
                    <Button startIcon={<span>⬇️</span>} onClick={() => {
                        // Add download logic here
                        console.log('Download clicked');
                    }}>
                        Tải
                    </Button>
                    <Button 
                        color="error"
                        onClick={() => {
                            // Add delete logic here
                            console.log('Delete clicked');
                        }}
                        sx={{ minWidth: '40px', p: 1 }}
                    >
                        ❌ Xoá
                    </Button>
                </Box>

                {/* <Divider sx={{ my: 2 }} /> */}

                <Box sx={{
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
                            alert('Lưu thành công');
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
                        Xoá
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FileInfoModal;