import axios from 'axios';
import React, { useState } from 'react'

const Event = ({event, handleDelete, setEvents}) => {
    // we will have many of this component!

    // each one will have a showform state
    const [show, setShow] = useState(false);
    const [newDescription, setNewDescription] = useState(event.description);
    const handleClick = (eventID) => {
        // axios call to our put route
        // id, new information
        // PUT     /events/:idOfEventID/
        axios({
            url: `/server/events/${eventID}`,
            method: "PUT",
            data: { 
                description: newDescription
            }
             // Find this in the req.body
        }) .then((response) => {
            
            console.log(response);
            setEvents((events) => {
                // find the event to change
                // replace it with response.body
                // response.body is the UPDATED object
                // []
                let stateCopy = events.map((eventObj) => {
                    if (eventObj._id === response.body._id) {
                        return response.data;
                    } else {
                        return stateCopy;
                    }
                });
                
            })
        })
    }

  return (
    <div key={event._id} className="event-item">
        {/* MongoDB creates _id so taht's why */}
        <button onClick={() => handleDelete(event._id)}>Delete</button>
        <button onClick={() => setShow(!show)}>Edit</button>
        <h2>{event.title}</h2>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Description: {event.description}</p>
        <div className="organizer">
        <strong>Organizer:</strong>
        <p>Name: {event.organizer.name}</p>
        <p>Role: {event.organizer.role}</p>
        </div>
        {/*show form? */}
        { show ? <form onSubmit={(e) => e.preventDefault()}>
            <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <button onClick={() => handleClick(event._id)}>Update this Event</button>
        </form> : <></> }
    </div>
  )
}

export default Event