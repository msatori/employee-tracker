//const db = require('./db');
// const PORT = process.env.PORT || 3001;
const connection = require('./db/connection');
//{ path: path.resolve(__dirname, '../.env')}

//const path = require('path');


connection.query('SELECT * FROM department', function(err, res) {
    console.log(res);

});


