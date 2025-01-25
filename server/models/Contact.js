const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    phone: {
        type: String,
        trim: true,
    },
    phoneVisible: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        trim: true,
    },
    emailVisible: {
        type: Boolean,
        default: true,
    },
    address: {
        type: String,
        trim: true,
    },
    addressVisible: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Contact", contactSchema);