import React, { useState, useEffect } from 'react';
import { Box, Modal, TextField, Button, Typography, Avatar, Divider } from '@mui/material';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [middleName, setMiddleName] = useState<string>('Nguyễn Minh');
  const [firstName, setFirstName] = useState<string>('Trực');
  const [fullName, setFullName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('01/01/2004');
  const [email, setEmail] = useState<string>('minhtruc1234@gmail.com');
  const [id, setID] = useState<string>('22120394');
  const [grade, setGrade] = useState<string>('2022');

  useEffect(() => {
    setFullName(`${middleName} ${firstName}`);
  }, [middleName, firstName]);

  const handleSave = () => {
    // Xử lý logic lưu thông tin tại đây
    console.log('Thông tin cá nhân đã cập nhật:', { middleName, firstName, fullName });
    onClose();
  };

  const handleChangePassword = () => {
    window.location.href = '/ResetPassword';
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          bgcolor: 'white',
          //border: '2px solid #000',
          boxShadow: 2,
          p: 4,
          display: 'flex',
          borderRadius: 8,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start', // Align items at the top
            alignItems: 'center', // Center horizontally
            flexDirection: 'column',
          }}
        >
          <Avatar alt="Avatar" src="https://avatar.iran.liara.run/public/25" sx={{ width: 150, height: 150 }} />
          <Typography sx={{ mt: 2, textAlign: 'center', fontSize: '16px', fontWeight: 'bold', color:'Highlight' }}>Học sinh</Typography> {/* Margin top to add space */}
          <Box sx={{
            flex:1,
            display:'flex',
            justifyContent:'flex-end',
            alignItem:'center',
            flexDirection:'column'
          }}>
            <Button variant="contained" color="primary" onClick={handleChangePassword} sx={{ height: 54, width: 160, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none', mb:2, backgroundColor:'red' }}>
              Đổi mật khẩu
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ height: 54, width: 160, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none', backgroundColor:'white', color:'red', border:'1px solid red' }}>
              Xác thực 2 bước
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 2 }}>
          <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>
            Cập nhật thông tin cá nhân
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Họ và tên đệm"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                margin="normal"
                fullWidth
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
              <TextField
                label="Tên"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
            </Box>
            <TextField
              fullWidth
              value={fullName}
              margin="normal"
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-notchedOutline': { borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px dashed gray' },
                  '& .MuiInputBase-input': { color: 'gray', pointerEvents: 'unset' },
                  style: { padding: '3px 3px', fontSize: '0.875rem' },
                },
              }}
              sx={{ height: 20, '& .MuiInputBase-input': { padding: '5px 12px' }, mb: 2 }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <TextField
                label="Ngày sinh"
                value={dateOfBirth}
                margin="normal"
                fullWidth
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
              <TextField
                label="Email cá nhân"
                value={email}
                margin="normal"
                fullWidth
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <TextField
                fullWidth
                label="Mã số học sinh/học viên"
                value={id}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0' },
                  style: { padding: '3px 3px', fontSize: '0.875rem' },
                }}
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
              <TextField
                fullWidth
                label="Khóa"
                value={grade}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: '#f0f0f0' },
                  style: { padding: '3px 3px', fontSize: '0.875rem' },
                }}
                sx={{ height: 40, '& .MuiInputBase-input': { height: '0.875em' } }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ height: 54, width: 160, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none' }}>
              Lưu thay đổi
            </Button>
            <Button variant="contained" onClick={onClose} sx={{ height: 54, width: 160, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none', backgroundColor: 'white', color: 'red' }}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
