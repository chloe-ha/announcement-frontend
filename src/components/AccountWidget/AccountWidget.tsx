import React, { FC } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../contexts/authContext';

const AccountWidget: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="account-widget">
      <IconButton onClick={handleClick}>
        <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className="profile" sx={{ width: 200, p: 2 }}>
          <Stack spacing={2}>
            <Typography>
              {`Welcome ${user.username} (${user.role.roleName})`}
            </Typography>
            <Button size="small" onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
};
export default AccountWidget;
