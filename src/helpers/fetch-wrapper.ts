import _G from './global';

const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    _G.exit();
    return Promise.reject(res);
  }
  if (res.status === 403) {
    return Promise.reject(res);
  }
  return Promise.resolve(res);
};

export const sendRequest = (
  url: string,
  method: 'POST' | 'GET' | 'DELETE' = 'GET',
  body: any = undefined,
): Promise<any> => fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: body ? JSON.stringify(body) : undefined,
}).then(handleResponse);
