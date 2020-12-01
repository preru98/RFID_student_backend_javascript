const mongoose = require('mongoose');
// const URI = '******';
const URI = 'mongodb+srv://Prerna1521:Prerna1521@rfid-tracking-solution.jrsrc.mongodb.net/<collegedb>?retryWrites=true&w=majority';

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