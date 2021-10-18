import React, { FC, useState, useReducer } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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

const roles = ['Manager', 'Staff'];

type AnnouncementEditProps = {
  action: 'create' | 'edit' | 'delete';
  refetch: () => Promise<any>;
  announcement?: Announcement;
};

const AnnouncementEdit: FC<AnnouncementEditProps> = (props) => {
  const { action, refetch, announcement } = props;

  const [open, setOpen] = useState(false);
  const [editedAnnouncement, dispatch] = useReducer(
    (prevState: Partial<Announcement>, newState: Partial<Announcement>) => ({ ...prevState, ...newState }),
    announcement || { title: '', description: '', roleName: 'Staff', datetime: new Date() }
  );
  const { title, description, roleName, datetime } = editedAnnouncement;

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
              value={title}
              placeholder="Announcement title"
              onChange={(event) => {
                dispatch({ title: event.target.value });
              }}
              {...(actionMap[action].fieldProps || {})}
            />
            <TextField
              required
              label="Description"
              value={description}
              placeholder="Announcement description"
              multiline
              rows={4}
              onChange={(event) => {
                dispatch({ description: event.target.value })
              }}
              {...(actionMap[action].fieldProps || {})}
            />
            <Select
              label="Role"
              value={roleName}
              onChange={(event) => {
                const newRole = event.target.value;
                if (newRole === 'Manager' || newRole === 'Staff') {
                  dispatch({ roleName: newRole });
                }
              }}
              required
            >
              {roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
            </Select>
            {roleName === 'Staff'
              ? <span>This announcement is visible for all managers and all staff</span>
              : <span>This announcement is only visible by managers</span>
            }
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(datePickerInputProps) => <TextField required {...datePickerInputProps} />}
                label="When"
                inputFormat="dd/MM/yyyy HH:mm"
                value={datetime || new Date()}
                onChange={(newValue) => {
                  if (newValue) {
                    dispatch({ datetime: newValue });
                  }
                }}
                {...(actionMap[action].fieldProps || {})}
              />
            </LocalizationProvider>
            <Button
              disabled={!title || !description || !datetime}
              onClick={submit}
            >{actionMap[action].modalButtonText}</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
export default AnnouncementEdit;