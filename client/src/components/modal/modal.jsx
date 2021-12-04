import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export function BasicModal({ content: Content, header, setOpen }) {
  return (
    <div>
      <Modal open={true} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {header}
          </Typography>
          {Content}
        </Box>
      </Modal>
    </div>
  );
}
