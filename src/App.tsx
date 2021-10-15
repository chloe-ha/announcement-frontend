import React, { FC, useEffect, useReducer } from 'react';
import './App.scss';


const server = process.env.REACT_APP_SERVER_URL;

const App = () => {
  return (
    <div className="App">
      <main>
        <Announcements />
      </main>
    </div>
  );
}

type AnnouncementState = {
  data: any[];
  isLoading: boolean;
};

const Announcements: FC = () => {
  const [{ data, isLoading }, dispatch] = useReducer((prevState: AnnouncementState, newState: Partial<AnnouncementState>) => ({ ...prevState, ...newState }), {
    data: [],
    isLoading: true
  });

  useEffect(() => {
    const url = `${server}/announcements`;
    fetch(url)
      .then(result => result.json())
      .then(data => {
        console.log('data', data);
        dispatch({ data, isLoading: false })
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="announcements">
      {isLoading
        ? <span>Load</span>
        : <div className="announcement-list">{data.map((d) => (
          <div key={d._id}><h3>{d.title}</h3><p>{d.description}</p></div>
        ))}</div>
      }
    </div>
  );
}

export default App;
