const mongoose = require('mongoose')

/**
 * This function will connect to the database and return the connection object.  
 * If deploying to prod must have process.env.MONGODB_URI defined!
 * @param {String} dbName The database name you're looking to connect to (defaults to "cinco")
 * @returns {mongoose.Types.Connection} the connection object to the database you are connected to.
 */
function connectToDB(dbName = "public-beef") {
    const uri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(db => console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`))
        .catch(err => console.error('Error connecting to mongo', err))
    mongoose.set('useCreateIndex', true);
    var db = mongoose.connection;
    db.on('connected', () => console.log('Connected to MongoDB database'));
    db.on('disconnected', () => console.log('Disconnected from MongoDB database'));
    db.on('SIGINT', () => {
        db.close(() => {
            console.log('Lost connection to MongoDB database due to process termination');
            process.exit();
        });
    });
    db.collection(dbName).conn.collections.users.createIndex({ location: "2dsphere" })
    return db
}

module.exports = connectToDB
//Congrats on finding this! Just an FYI, Adrian is shit at CSS and frontend