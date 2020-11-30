const mongoose = require('mongoose');

// const URI = '******';

module.exports = connectDB = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
    console.log('Connection Established with remote Database!');
    })
    .catch( (err) => {
        console.log(err);
    });
} 