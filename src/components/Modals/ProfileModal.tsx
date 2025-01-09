import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import ReactModal from "react-modal";
import { updateUserAPI, UpdateUserContent } from "../../services/user";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useAuth().user;
  // console.log("User in ProfileModal: ", JSON.stringify(user));

  // const [middleName, setMiddleName] = useState<string>("Nguyễn Minh");
  // const [firstName, setFirstName] = useState<string>("Trực");
  // const [fullName, setFullName] = useState<string>("");
  // const [dateOfBirth, setDateOfBirth] = useState<string>("01/01/2004");
  // const [email, setEmail] = useState<string>("minhtruc1234@gmail.com");
  // const [id, setID] = useState<string>("22120394");
  // const [grade, setGrade] = useState<string>("2022");
  // useEffect(() => {
  //   setFullName(`${middleName} ${firstName}`);
  // }, [middleName, firstName]);

  const [middleName, setMiddleName] = useState<string>(user?.lastName || "");
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const fullName = `${middleName} ${firstName}`;
  const [dateOfBirth, setDateOfBirth] = useState<Date>(
    user?.dateOfBirth || new Date()
  );
  const email = user?.email || "";
  const id = "chưa hỗ trợ";
  const grade = "2022";

  if (user === null) {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          onClose();
        }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Hãy đăng nhập lại
          <br />
          để xem thông tin cá nhân
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 w-fit"
          >
            Ok
          </button>
        </div>
      </ReactModal>
    );
  }

  const handleSave = async () => {
    // Xử lý logic lưu thông tin tại đây
    // console.log("Thông tin cá nhân đã cập nhật:", {
    //   middleName,
    //   firstName,
    //   fullName,
    // });
    try {
      const updateContent: UpdateUserContent = {
        firstName,
        lastName: middleName,
        dateOfBirth,
      };
      await updateUserAPI(updateContent);
      alert("Cập nhật thông tin thành công");
      onClose();
    } catch (error: any) {
      console.log("Error in handleSave: ", error.message);
      alert("Cập nhật thông tin thất bại");
    }
  };

  const handleChangePassword = () => {
    window.location.href = "/reset-password";
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box // FOR THE WHOLE MODAL
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "white",
          //border: '2px solid #000',
          boxShadow: 2,
          p: 4,
          display: "flex",
          borderRadius: 8,

          // border: '1px solid #ff0099',
        }}
      >
        <Box // FOR AVATAR, PASSWORD CHANGE BUTTON AND 2-STEP VERIFICATION BUTTON
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start", // Align items at the top
            alignItems: "center", // Center horizontally
            flexDirection: "column",

            // border: '1px solid #ff0099',
          }}
        >
          <Avatar
            alt="Avatar"
            src="https://avatar.iran.liara.run/public/25"
            sx={{ width: 150, height: 150 }}
          />
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              color: "Highlight",
            }}
          >
            Học sinh
          </Typography>{" "}
          {/* Margin top to add space */}
          <Box
            sx={{
              // FOR THE BUTTONS
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItem: "center",
              flexDirection: "column",

              // border: '1px solid #ff0099',
            }}
          >
            {/*<Button variant="contained" color="primary" onClick={handleSave} sx={{ height: 54, width: 160, fontSize: '1rem', padding: '0 10px', borderRadius: '8px', textTransform: 'none', mb: 2, backgroundColor: 'red' }}> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{
                height: 54,
                width: 160,
                fontSize: "1rem",
                padding: "0 10px",
                borderRadius: "8px",
                textTransform: "none",
                mb: 2,
                backgroundColor: "red",
              }}
            >
              Đổi mật khẩu
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                height: 54,
                width: 160,
                fontSize: "1rem",
                padding: "0 10px",
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "white",
                color: "red",
                border: "1px solid red",
              }}
            >
              Xác thực 2 bước
            </Button>
          </Box>
        </Box>

        <Box // FOR THE MAIN FORM
          sx={{
            flex: 2,
            // border: '1px solid #ff0099',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            Cập nhật thông tin cá nhân
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            {" "}
            {/* FOR NAMES */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                // border: '1px solid #ff0099',
              }}
            >
              <TextField
                label="Họ và tên đệm"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                margin="normal"
                fullWidth
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                }}
              />
              <TextField
                label="Tên"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                }}
              />
            </Box>
            <TextField
              fullWidth
              value={fullName}
              margin="normal"
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px dashed gray",
                  },
                  "& .MuiInputBase-input": {
                    color: "gray",
                    pointerEvents: "unset",
                  },
                  style: { padding: "3px 3px", fontSize: "0.875rem" },
                },
              }}
              sx={{
                height: 20,
                "& .MuiInputBase-input": { padding: "5px 12px" },
                mb: 2,
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <TextField
                label="Ngày sinh"
                value={new Date(dateOfBirth).toISOString().split("T")[0]}
                onChange={(e) => {
                  if (e.target["validity"].valid) {
                    setDateOfBirth(new Date(e.target.value));
                  }
                }}
                margin="normal"
                fullWidth
                type="date"
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                }}
              />
              <TextField
                label="Email cá nhân"
                value={email}
                margin="normal"
                aria-readonly="true"
                fullWidth
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                  backgroundColor: "#f0f0f0",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 4 }}>
              <TextField
                fullWidth
                label="Mã số học sinh/giáo viên"
                value={id}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: "#f0f0f0" },
                  style: {
                    padding: "3px 3px",
                    fontSize: "0.875rem",
                    color: "gray",
                  },
                }}
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                }}
              />
              <TextField
                fullWidth
                label="Khóa"
                value={grade}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  sx: { backgroundColor: "#f0f0f0" },
                  style: { padding: "3px 3px", fontSize: "0.875rem" },
                }}
                sx={{
                  height: 40,
                  "& .MuiInputBase-input": { height: "0.875em" },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{
                height: 54,
                width: 160,
                fontSize: "1rem",
                padding: "0 10px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Lưu thay đổi
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                height: 54,
                width: 160,
                fontSize: "1rem",
                padding: "0 10px",
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "white",
                color: "red",
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
