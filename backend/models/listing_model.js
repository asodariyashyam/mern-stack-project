const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    regularPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    furnisher: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
    },
    userRef: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
