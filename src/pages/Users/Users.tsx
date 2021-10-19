import React, { useReducer, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fetchUsers, inviteUser } from '../../models/User';
import Button from '../../components/Button/Button';

type UserState = {
  staff: User[];
  managers: User[];
  newStaffEmail: string;
  newManagerEmail: string;
  isLoading: boolean;
};

const boxStyle = {
  width: 400,
  border: '1px solid #ccc',
  p: 3,
  m: '10px auto auto',
};

const Users = () => {
  const [{
    staff, managers, newStaffEmail, newManagerEmail, isLoading,
  }, dispatch] = useReducer(
    (prevState: UserState, newState: Partial<UserState>) => ({ ...prevState, ...newState }),
    {
      managers: [],
      staff: [],
      newManagerEmail: '',
      newStaffEmail: '',
      isLoading: true,
    },
  );

  const handleInviteUser = (email: string, role: 'Manager' | 'Staff') => {
    inviteUser(email, role).then(() => {
      dispatch({ newStaffEmail: '', newManagerEmail: '' });
    });
  };

  useEffect(() => {
    dispatch({ isLoading: true });
    fetchUsers()
      .then((fetchedUsers) => {
        const staffUsers = fetchedUsers.filter((s) => s.role.roleName === 'Staff');
        const managerUsers = fetchedUsers.filter((m) => m.role.roleName === 'Manager');
        dispatch({ staff: staffUsers, managers: managerUsers, isLoading: false });
      });
  }, []);

  return (
    <div className="user-list">
      {isLoading
        ? (
          <Box
            className="signup-box"
            sx={{
              width: 500,
              p: 4,
              m: '10px auto auto',
              textAlign: 'center',
            }}
          >
            Loading ...

          </Box>
        )
        : (
          <>
            <Box className="managers" sx={boxStyle}>
              <Stack spacing={4}>
                <Typography variant="h6" component="h2">Managers</Typography>
                {managers.length
                  ? (
                    <ul>
                      {managers.map((m) => <li key={m.email}>{`${m.username} (${m.email})`}</li>)}
                    </ul>
                  )
                  : <div>No managers yet</div>}
                <Stack direction="row" spacing={2}>
                  <TextField
                    required
                    label="Invite new manager"
                    value={newManagerEmail}
                    placeholder="Enter manager email"
                    onChange={(event) => {
                      dispatch({ newManagerEmail: event.target.value });
                    }}
                  />
                  <Button
                    disabled={!newManagerEmail}
                    onClick={() => handleInviteUser(newManagerEmail, 'Manager')}
                  >
                    Invite
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Box className="staff" sx={boxStyle}>
              <Stack spacing={4}>
                <Typography variant="h6" component="h2">Staff</Typography>
                {staff.length
                  ? (
                    <ul>
                      {staff.map((m) => <li key={m.email}>{`${m.username} (${m.email})`}</li>)}
                    </ul>
                  )
                  : <div>No staff yet</div>}
                <Stack direction="row" spacing={2}>
                  <TextField
                    required
                    label="Invite new staff"
                    value={newStaffEmail}
                    placeholder="Enter staff email"
                    onChange={(event) => {
                      dispatch({ newStaffEmail: event.target.value });
                    }}
                  />
                  <Button
                    disabled={!newStaffEmail}
                    onClick={() => handleInviteUser(newStaffEmail, 'Staff')}
                  >
                    Invite
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
    </div>
  );
};

export default Users;
