import React, { useState } from 'react';
import { Button } from '@mui/material';

import ProfileModal from '../components/Modals/ProfileModal';
import FileInfoModal from '../components/Modals/TeacherViewFileInfo';
import FileUploadModal from '../components/Modals/TeacherUploadFile';

const ModalPage = () => {
  const [profileModalIsOpen, setProfileModalIsOpen] = useState<boolean>(false);
  const [fileInfoModalIsOpen, setFileInfoModalIsOpen] = useState<boolean>(false);
  const [fileUploadModalIsOpen, setFileUploadModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setProfileModalIsOpen(true)}>
        Edit Profile
      </Button>
      <ProfileModal
        isOpen={profileModalIsOpen}
        onClose={() => setProfileModalIsOpen(false)}
      />

      <Button variant="contained" color="primary" onClick={() => setFileInfoModalIsOpen(true)}>
        View File Info (for teachers)
      </Button>
      <FileInfoModal
        isOpen={fileInfoModalIsOpen}
        onClose={() => setFileInfoModalIsOpen(false)}
      />

      <Button variant="contained" color="primary" onClick={() => setFileUploadModalIsOpen(true)}>
        Click to Upload (for teachers)
      </Button>
      <FileUploadModal
        isOpen={fileUploadModalIsOpen}
        onClose={() => setFileUploadModalIsOpen(false)}
      />
    </div>
  );
};

export default ModalPage;
