import React from 'react';
import { EventCalendar } from './Components';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EventCalendar />
    </div>
  );
}

export default App;
