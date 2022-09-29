const express = require("express");
const router = express.Router();
const noteList = require("../repositories/NoteList");

router.route("/").get(function (req, res, next) {
  res.redirect("/notes");
});

module.exports = router;
