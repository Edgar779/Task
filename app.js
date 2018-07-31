const express = require("express")
    , hbs = require('express-handlebars')
    , app = express()
    , path = require("path")
    , mongoose = require("mongoose")
    , users = require("./model/users.js")
    , bodyParser = require("body-parser");

mongoose.Promise = global.Promise;


mongoose.connect("mongodb://Edgar779:lenta12345678910@ds231941.mlab.com:31941/mydb");

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/view/'}));
app.set('views', path.join(__dirname, '/view'));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.render("addUser");
});

app.post("/", function (req, res) {
console.log(typeof req.body.user.name);
    let newUser = new users();
    try {
        users.create({name: req.body.user.name, surname: req.body.user.surname, email: req.body.user.email});
    } catch (err) {
        res.send(err);
    }
    res.render("addUser");
});

app.get("/showUsers", function (req, res) {
    users.find({})
        .exec()
        .then(result => {
            //console.log(result);
            res.render("showUsers", {result: result});
        })
        .catch(err => {
           // console.log(err);
            res.send(500)(err);
        });
});

app.delete('/showUsers', (req, res) => {
    users.findOneAndRemove({_id: req.body.id})
        .exec()
        .then(() => res.end()
        )
        .catch(err => {
            res.send(err);
        });
});

app.put('/edit', function (req, res) {
    users.findByIdAndUpdate(req.body.id, req.body, {new: true})
        .exec()
        .then((user) => {
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.email = req.body.email;
            res.end();
        })
        .catch((err) => res.send(err));
});

app.listen(3000, function () {
    console.log("server run");
});