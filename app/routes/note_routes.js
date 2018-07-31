var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    app.get('/',(req,res)=>{
        res.status(200).send("success");
    });
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.post('/notes', (req, res) => {
        const note = { firstname: req.body.firstname, lastname: req.body.lastname,
            birthdate: req.body.birthdate, address: req.body.address, address2: req.body.address2,
            country: req.body.country, city: req.body.city, postalcode: req.body.postalcode};
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });


    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = { firstname: req.body.firstname, lastname: req.body.lastname,
            birthdate: req.body.birthdate, address: req.body.address, address2: req.body.address2,
            country: req.body.country, city: req.body.city, postalcode: req.body.postalcode};
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};
