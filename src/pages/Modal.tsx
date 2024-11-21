import React, { useState } from 'react';
import ProfileModal from '../components/ModalUpdateProfile/ProfileModal';
import { Button } from '@mui/material';

const ModalPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
        Edit Profile
      </Button>
      <ProfileModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default ModalPage;
