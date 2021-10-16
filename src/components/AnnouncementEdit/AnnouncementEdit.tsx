import React, { FC, useState, useReducer } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Box from '@mui/material/Box';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { createAnnouncement, editAnnouncement, deleteAnnouncement } from 'models/Announcement';

import Button from 'components/Button/Button';

import './AnnouncementEdit.scss';

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 14,
  p: 4,
};

const actionMap = {
  'create': {
    buttonText: 'Create new announcement',
    modalTitle: 'Create new announcement',
    modalButtonText: 'Create',
    fieldProps: {},
    buttonProps: {},
    submitMethod: createAnnouncement
  },
  'edit': {
    buttonText: 'Edit',
    modalTitle: 'Edit announcement',
    modalButtonText: 'Update',
    fieldProps: {},
    buttonProps: {
      className: 'edit-button',
      look: 'transparent'
    },
    submitMethod: editAnnouncement
  },
  'delete': {
    buttonText: 'Delete',
    modalTitle: 'Delete announcement',
    modalButtonText: 'Delete',
    fieldProps: {
      disabled: true
    },
    buttonProps: {
      look: 'transparent'
    },
    submitMethod: deleteAnnouncement
  }
};
type AnnouncementEditProps = {
  action: 'create' | 'edit' | 'delete';
  refetch: () => Promise<any>;
  announcement?: Announcement;
}

const AnnouncementEdit: FC<AnnouncementEditProps> = (props) => {
  const { action, refetch, announcement } = props;

  const [open, setOpen] = useState(false);
  const [editedAnnouncement, dispatch] = useReducer(
    (prevState: Partial<Announcement>, newState: Partial<Announcement>) => ({ ...prevState, ...newState }),
    announcement || { title: '', description: '', datetime: new Date() }
  );

  const submit = () => {
    const submitMethod = actionMap[action].submitMethod;
    submitMethod(editedAnnouncement).then(() => {
      refetch().then(() => {
        setOpen(false);
      });
    });
  };

  return (
    <div className="announcement-edit">
      <Button onClick={() => setOpen(true)} {...(actionMap[action].buttonProps || {})}>
        {actionMap[action].buttonText}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="announcement-edit-modal-box" sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {actionMap[action].modalTitle}
            </Typography>
            <TextField
              required
              label="Title"
              value={editedAnnouncement?.title}
              placeholder="Announcement title"
              onChange={(event) => {
                dispatch({ title: event.target.value });
              }}
              {...(actionMap[action].fieldProps || {})}
            />
            <TextField
              required
              label="Description"
              value={editedAnnouncement?.description}
              placeholder="Announcement description"
              multiline
              rows={4}
              onChange={(event) => {
                dispatch({ description: event.target.value })
              }}
              {...(actionMap[action].fieldProps || {})}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(datePickerInputProps) => <TextField required {...datePickerInputProps} />}
                label="When"
                inputFormat="dd/MM/yyyy HH:mm"
                value={editedAnnouncement.datetime || new Date()}
                onChange={(newValue) => {
                  if (newValue) {
                    dispatch({ datetime: newValue });
                  }
                }}
                {...(actionMap[action].fieldProps || {})}
              />
            </LocalizationProvider>
            <Button onClick={submit}>{actionMap[action].modalButtonText}</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
export default AnnouncementEdit;