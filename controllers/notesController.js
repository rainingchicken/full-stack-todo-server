const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  try {
    //find the note
    const notes = await Note.find({ user: req.user._id });

    //respond with them
    res.json({ notes: notes });
  } catch (error) {
    res.sendStatus(400);
  }
};

const fetchNote = async (req, res) => {
  try {
    //get id off the url
    const noteId = req.params.id;

    //find the note using that id
    const note = await Note.findOne({ _id: noteId, user: req.user._id });

    //respond with the note
    res.json({ note: note });
  } catch (error) {
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try {
    //get the sent in data off resquest body
    const { title, body } = req.body;
    //   const title = req.body.title;
    //   const body = req.body.body;

    //create a note with it
    const note = await Note.create({
      title,
      body,
      user: req.user._id,
    });

    //respond witht eh new note
    res.json({ note });
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateNote = async (req, res) => {
  try {
    //get id off the url
    const noteId = req.params.id;

    //get data off the req body
    const { title, body } = req.body;
    //   const title = req.body.title;
    //   const body = req.body.body;

    //find and update the record
    await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        title,
        body,
      }
    );

    //find updated note
    const note = await Note.findById(noteId);

    //respond with the note
    res.json({ note: note });
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteNote = async (req, res) => {
  try {
    //get id off the url
    const noteId = req.params.id;

    //find and delete the record
    await Note.deleteOne({ _id: noteId, user: req.user._id });
    // await Note.deleteOne({ _id: noteId });

    //respond with the note
    res.json({ success: "Record deleted" });
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
