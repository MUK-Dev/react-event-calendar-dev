import React from 'react';
import { EventCalendar } from './Components';

function App() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3em 0',
      }}
    >
      <EventCalendar />
    </div>
  );
}

export default App;
