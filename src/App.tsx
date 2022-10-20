import { Typography } from '@mui/material';
import moment from 'moment';
import { EventCalendar } from './Components';
import { EventsData } from './Components/types';

function App() {
  const data: EventsData = [
    {
      date: new Date(),
      title: 'First',
      popupContent: (
        <>
          <Typography>Hello Popup 1</Typography>
        </>
      ),
      id: '1',
    },
    {
      date: moment(),
      title: 'Second',
      popupContent: (
        <>
          <Typography>Hello Popup 2</Typography>
        </>
      ),
      id: '2',
    },
    {
      date: new Date(),
      title: 'Third',
      popupContent: (
        <>
          <Typography>Hello Popup 3</Typography>
        </>
      ),
      color: '#000',
      id: '3',
    },
    {
      date: new Date(),
      title: 'Fourth',
      popupContent: (
        <>
          <Typography>Hello Popup 4</Typography>
        </>
      ),
      color: '#ffe100',
      id: '4',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '3em 0',
      }}
    >
      <EventCalendar
        dataSource={data}
        pallet={{ primary: '#70231d', secondary: '#4a4a4a' }}
      />
    </div>
  );
}

export default App;
