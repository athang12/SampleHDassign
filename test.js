const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://athang:Athang33!@cluster0.6l3xyvd.mongodb.net/New', {})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));
