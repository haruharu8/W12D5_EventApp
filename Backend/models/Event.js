

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, require: true},
        date: { type: Date, require: true},
        location: { type: String, require: true},
        description: { type: String, require: true},
        organizer: {
            name: { type: String, required: true},
            role: { type: String, required: true},
        }
    }, 
    {
        timestamps: true
    });


    // points to events
    const Event = mongoose.model("Event", eventSchema);

    module.exports = Event;