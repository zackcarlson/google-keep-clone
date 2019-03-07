var express = require('express');
var bodyParser = require('body-parser');
var notes = require('../database-mongo');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/notes', function (req, res) {
  notes.selectAll()
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.post('/notes', function(req, res) {
  notes.save(req.body)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.delete('/notes', function(req, res) {
  notes.deleteByID(req.body)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.put('/notes', function(req, res) {
  notes.updateColor(req.body)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.put('/modal-notes', function(req, res) {
  notes.updateModalData(req.body)
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../react-client/dist/index.html'));
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});