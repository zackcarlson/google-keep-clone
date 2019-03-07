const mongoose = require('mongoose');
const uriString = process.env.MONGODB_URI || 'mongodb://localhost/test';
mongoose.Promise = global.Promise;
mongoose.connect(uriString, { useNewUrlParser: true });

const db = mongoose.connection;

db
  .once('open', () => console.log('mongoose connected successfully'))
  .on('error', (error) => console.warn('Warning: ', error));

const NoteSchema = new mongoose.Schema({
  date: Number,
  title: String,
  note: String,
  cardColor: String
});
  
const Note = mongoose.model('note', NoteSchema);

const selectAll = () => {
  return new Promise((resolve, reject) => {
    Note.find({}).sort({date:-1})
      .then(notes => resolve(notes))
      .catch(error => reject(error));
  });
};

const save = (noteObj) => {
  return new Promise((resolve, reject) => {
  let newNote = new Note(noteObj);
  newNote.save()
    .then(() => Note.find({}).sort({date:-1}))
    .then(notes => resolve(notes))
    .catch(error => reject(error));
  }); 
};

const deleteByID = (idObj) => {
  return new Promise((resolve, reject) => {
    Note.findByIdAndRemove(idObj._id)
      .then(() => Note.find({}).sort({date:-1}))
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const updateColor = (idObj) => {
  const { id, color } = idObj;
  return new Promise((resolve, reject) => {
    Note.findByIdAndUpdate(id, { cardColor: color })
      .then(() => Note.find({}).sort({date:-1}))
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const updateModalData = (idObj) => {
  const { id, note, title } = idObj;
  return new Promise((resolve, reject) => {
    Note.findByIdAndUpdate(id, { note, title })
      .then(() => Note.find({}).sort({date:-1}))
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

module.exports = {
  Note,
  selectAll,
  save,
  deleteByID,
  updateColor,
  updateModalData
};