import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Event from '../Event';

const EventList = ({events, setEvents}) => {
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios('/server/events');
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

  // showForm, setShowForm = useState(false)
  // idToShow

  // which event should the form change?
  // One form

  return (
    <div className="event-list">
      <h3> List of Events</h3>
      {events.map(event => (
       <Event key={event._id} event={event} setEvents={setEvents} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default EventList;