const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db = require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url,(err,database) =>{

    if (err) return console.log(err)
    const PORT = process.env.PORT || 3000
    require('./app/routes')(app, database);
    app.listen(PORT,() => {
        console.log("We are live on");
    });

});
