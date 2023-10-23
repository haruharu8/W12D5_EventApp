import './App.css'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import { useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  return (
    <>
      My Event

      <EventForm setEvents={setEvents} />
      <EventList events={events} setEvents={setEvents} />
    </>
  )
}

export default App