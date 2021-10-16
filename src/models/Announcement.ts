const server = process.env.REACT_APP_SERVER_URL;

export const fetchAnnouncements = () => {
  const url = `${server}/announcements`;
  return fetch(url)
    .then((result) => result.json())
    .catch((err) => console.log(err));
}

export const createAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const url = `${server}/announcement`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedAnnouncement)
  })
    .catch((err) => console.log(err));
};

export const editAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const { _id, ...rest } = editedAnnouncement;
  const url = `${server}/announcement/${_id}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest)
  })
    .catch((err) => console.log(err));
};

export const deleteAnnouncement = (editedAnnouncement: Partial<Announcement>) => {
  const { _id } = editedAnnouncement;
  const url = `${server}/announcement/${_id}`;
  return fetch(url, {
    method: 'DELETE'
  })
    .catch((err) => console.log(err));
};