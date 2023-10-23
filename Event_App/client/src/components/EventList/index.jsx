import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/server/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);


  console.log("i'm on first render, before useEffect")

  const handleDelete = (eventID) => {
    //1. go to MongoDB and deelte from DB
    let response = await axios({
      method: "DELETE",
      url: `/server/events/${eventID}`
    })
    //2. it's still in state! Still on screen
    //3. so - set state w/ this ID!
  }

  return (
    <div className="event-list">
      <h3> List of Events</h3>
      {events.map(event => (
        <div key={event._id} className="event-item">
          <button onClick={() => handleDelete(event._id)}>Delete</button>
          <h2>{event.title}</h2>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Description: {event.description}</p>
          <div className="organizer">
            <strong>Organizer:</strong>
            <p>Name: {event.organizer.name}</p>
            <p>Role: {event.organizer.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;