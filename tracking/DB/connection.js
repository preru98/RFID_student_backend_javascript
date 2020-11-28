const mongoose = require('mongoose');
const URI = 'mongodb+srv://Prerna15:*****@**.gyh5q.mongodb.net/test?retryWrites=true&w=majority';

module.exports = connectDB = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
    console.log('Connection Established with remote Database')
    })
    .catch(err => console.log(err));
} 