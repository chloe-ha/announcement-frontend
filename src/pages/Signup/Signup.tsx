import { FC, useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Button from 'components/Button/Button';
import { fetchTokenEmail, postUser } from 'models/User';
import { useHistory } from 'react-router';

type SignupProps = {
  match: {
    params: {
      token: string;
    }
  }
}
type SignupType = {
  username: string;
  password: string;
}
const Signup: FC<SignupProps> = (props) => {
  const token = props.match.params.token;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [email, setEmail] = useState('');
  const [{ username, password }, dispatch] = useReducer((prevState: SignupType, newState: Partial<SignupType>) => ({ ...prevState, ...newState }),
    { username: '', password: '' });

  const handlePostUser = () => {
    setIsLoading(true);
    postUser({ email, username, password }, token)
      .then(() => history.push('/login'))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchTokenEmail(token)
      .then(res => res.json())
      .then(result => {
        setIsLoading(false);
        if (result.email) {
          setIsValidToken(true);
          setEmail(result.email);
          dispatch({ username: result.email });
        } else {
          setIsValidToken(false);
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Box
        className="signup-box"
        sx={{
          width: 500,
          p: 4,
          m: '10px auto auto',
          textAlign: 'center'
        }}
      >Retrieving information ...</Box>
    );
  }
  if (!isValidToken) {
    return (
      <Box
        className="signup-box"
        sx={{
          width: 500,
          p: 4,
          m: '10px auto auto',
          textAlign: 'center'
        }}
      >Invalid token</Box>
    );
  }
  return (
    <Box
      className="signup-box"
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
          disabled
        />
        <TextField
          required
          label="Username"
          value={username}
          onChange={(event) => {
            dispatch({ username: event.target.value });
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
        <Button
          disabled={!username || !password}
          onClick={handlePostUser}
        >Signup</Button>
      </Stack>
    </Box>
  );
}

export default Signup;