import { sendRequest } from '../helpers/fetch-wrapper';

const server = process.env.REACT_APP_SERVER_URL;

export const fetchAnnouncements = () => {
  const url = `${server}/announcements`;
  return sendRequest(url)
    .then((result) => result.json())
    .catch((err) => console.error(err));
};

export const createAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const url = `${server}/announcement`;
  return sendRequest(url, 'POST', editedAnnouncement)
    .catch((err) => console.error(err));
};

export const editAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const { _id, ...rest } = editedAnnouncement;
  const url = `${server}/announcement/${_id}`;
  return sendRequest(url, 'POST', rest)
    .catch((err) => console.error(err));
};

export const deleteAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const { _id } = editedAnnouncement;
  const url = `${server}/announcement/${_id}`;
  return sendRequest(url, 'DELETE')
    .catch((err) => console.error(err));
};
