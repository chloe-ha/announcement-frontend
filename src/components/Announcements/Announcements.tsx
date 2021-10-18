import React, { FC, useReducer, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { fetchAnnouncements } from '../../models/Announcement';

import AnnouncementEdit from '../AnnouncementEdit/AnnouncementEdit';

import './Announcements.scss';

type StateType = {
  data: Announcement[];
  isLoading: boolean;
};
type AnnouncementsProps = {
  view?: 'classic' | 'admin';
};

const Announcements: FC<AnnouncementsProps> = ({ view = 'classic' }) => {
  const [{ data, isLoading }, dispatch] = useReducer(
    (prevState: StateType, newState: Partial<StateType>) => ({ ...prevState, ...newState }),
    {
      data: [],
      isLoading: true,
    },
  );

  const fetchData = () => {
    dispatch({ isLoading: true });
    return fetchAnnouncements()
      .then((fetchedData) => dispatch({ data: fetchedData, isLoading: false }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="announcements">
      {isLoading
        ? (
          <Stack spacing={2} className="announcements-skeleton">
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
          </Stack>
        )
        : (
          <div className="announcement-list">
            {data.map((d) => (
              <div key={d._id} className="announcement-item">
                <h3>{d.title}</h3>
                <p>{d.description}</p>
                {view === 'admin'
                  ? (
                    <div className="actions">
                      <AnnouncementEdit action="edit" announcement={d} refetch={fetchData} />
                      <AnnouncementEdit action="delete" announcement={d} refetch={fetchData} />
                    </div>
                  )
                  : null}
              </div>
            ))}
            {view === 'admin'
              ? (
                <div className="create-action">
                  <AnnouncementEdit action="create" refetch={fetchData} />
                </div>
              )
              : null}
          </div>
        )}
    </div>
  );
};

export default Announcements;
