const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    hoverText: {
        type: String,
        trim: true,
    },
    imageLink: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Membership", membershipSchema);