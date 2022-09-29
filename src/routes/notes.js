const express = require("express");
const router = express.Router();
const noteList = require("../repositories/NoteList");
const yup = require("yup");

const addNoteSchema = yup.object({
  body: yup
    .object({
      category: yup.string().min(1).required(),
      content: yup.string().min(3).required(),
    })
    .strict()
    .noUnknown(),
});

const validateAddNote = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

const editeNoteSchema = yup.object({
  body: yup
    .object({
      category: yup.string().min(1).required(),
      content: yup.string().min(3).required(),
    })
    .strict()
    .noUnknown(),

  params: yup
    .object({
      id: yup.string().min(1).required(),
    })
    .strict()
    .noUnknown(),
});

const validateEditNote = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

router
  .route("/")
  .post(validateAddNote(addNoteSchema), function (req, res) {
    // res.render("index", { title: "Express", category: "wish" });
    const { category, content } = req.body;
    noteList.addNote(category, content);
    res.send(
      `Note added, there are ${JSON.stringify(
        noteList.notes.length
      )} notes in storage now`
    );
  })
  .get(function (req, res) {
    res.json(noteList.notes);
  });

router
  .route("/:id")
  .delete(function (req, res) {
    try {
      noteList.deleteNote(req.params.id);
      res.send(
        `Note deleted, now there are ${JSON.stringify(
          noteList.notes.length
        )} notes in storage now`
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .patch(validateEditNote(editeNoteSchema), function (req, res) {
    const { category, content } = req.body;
    const id = req.params.id;
    try {
      noteList.editNote(id, { category, content });
      res.send(`Note with id: ${id} was edited`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .get(function (req, res, next) {
    const id = req.params.id;

    if (id === "stats") {
      res.json(noteList.getTotalActiveArchiveNotes());
    } else {
      try {
        res.json(noteList.getNote(id));
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  });

router.get("/notes/stats", function (req, res) {
  res.send(`Statistic: ${JSON.stringify(noteList.getTotalActiveArchiveNotes)}`);
});

module.exports = router;
