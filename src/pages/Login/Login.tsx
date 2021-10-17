import { useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { LoginCreds, useAuth } from 'contexts/authContext';
import Button from 'components/Button/Button';

const Login = () => {
  const [{ email, password }, dispatch] = useReducer(
    (prevState: LoginCreds, newState: Partial<LoginCreds>) => ({ ...prevState, ...newState }),
    {
      email: '',
      password: '',
    },
  );

  const { login, checkIsAuth } = useAuth();

  useEffect(() => {
    checkIsAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      className="login-box"
      sx={{
        width: 500,
        p: 4,
        m: 'auto'
      }}
    >
      <Stack spacing={2}>
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(event) => {
            dispatch({ email: event.target.value });
          }}
        />
        <TextField
          required
          label="Password"
          value={password}
          type="password"
          onChange={(event) => {
            dispatch({ password: event.target.value })
          }}
        />
        <Button disabled={!email || !password} onClick={() => login({ email, password })}>Login</Button>
      </Stack>
    </Box>
  );
}
export default Login;