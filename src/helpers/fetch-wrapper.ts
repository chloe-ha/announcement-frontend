import _G from 'helpers/global';

export const sendRequest = (
  url: string,
  method: 'POST' | 'GET' | 'DELETE' = 'GET',
  body: any = undefined
): Promise<any> => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body ? JSON.stringify(body): undefined
  }).then(handleResponse);
};

const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    _G.exit();
    return Promise.reject(res);
  }
  if (res.status === 403) {
    return Promise.reject(res);
  }
  return Promise.resolve(res);
}