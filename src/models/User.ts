import { sendRequest } from '../helpers/fetch-wrapper';

const server = process.env.REACT_APP_SERVER_URL;

export const fetchUsers = (): Promise<User[]> => {
  const url = `${server}/users`;
  return sendRequest(url)
    .then((result) => result.json())
    .catch((err) => console.error(err));
};

export const inviteUser = (email: string, role: 'Manager' | 'Staff') => {
  const url = `${server}/invite-user`;
  return sendRequest(url, 'POST', { email, role })
    .catch((err) => console.error(err));
};

export const fetchTokenEmail = (token: string) => {
  const url = `${server}/token-email/${token}`;
  return sendRequest(url)
    .catch((err) => console.error(err));
};

type NewUser = {
  email: string;
  username: string;
  password: string;
};
export const postUser = (user: NewUser, token: string) => {
  const url = `${server}/user/${token}`;
  return sendRequest(url, 'POST', user)
    .catch((err) => console.error(err));
};
