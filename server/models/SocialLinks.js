const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema({
    scholar: {
        type: String,
        trim: true,
    },
    scholarVisible: {
        type: Boolean,
        default: true,
    },
    orcid: {
        type: String,
        trim: true,
    },  
    orcidVisible: {
        type: Boolean,
        default: true,
    },
    publons: {
        type: String,
        trim: true,
    },
    publonsVisible: {
        type: Boolean,
        default: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    linkedinVisible: {
        type: Boolean,
        default: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    twitterVisible: {
        type: Boolean,
        default: true,
    },
    instagram: {
        type: String,
        trim: true,
    },
    instagramVisible: {
        type: Boolean,
        default: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    facebookVisible: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("SocialLinks", socialLinksSchema);