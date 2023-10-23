import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const EventList = ({events, setEvents}) => {
  

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

  const handleDelete = async (eventID) => {
    //1. go to MongoDB and deelte from DB
    let response = await axios({
      method: "DELETE",
    // deleete      /events/:idOfEvent
      url: `/server/events/${eventID}`
    })
    if (response.status === 200) {
      //2. it's still in state! Still on screen
      //3. so - set state w/ this ID!
      setEvents(events.filter(event => event._id !== eventID));
    }
  }

  return (
    <div className="event-list">
      <h3> List of Events</h3>
      {events.map(event => (
        <div key={event._id} className="event-item">
          {/* MongoDB creates _id so taht's why */}
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