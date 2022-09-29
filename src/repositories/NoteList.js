"use strict";

class NoteList {
  constructor() {
    this.notes = [
      {
        category: "random thought",
        created: "september 22, 2022",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        id: "0",
        active: true,
      },
      {
        category: "random thought",
        created: "september 22, 2022",
        content:
          "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        id: "1",
        active: true,
      },
      {
        category: "idea",
        created: "september 22, 2022",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        id: "2",
        active: true,
      },
      {
        category: "random thought",
        created: "september 22, 2022",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        id: "3",
        active: true,
      },
      {
        category: "task",
        created: "september 22, 2022",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit 5/1/2022 , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        id: "4",
        active: true,
      },
      {
        category: "random thought",
        created: "september 22, 2022",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        id: "5",
        active: true,
      },
      {
        category: "idea",
        created: "september 22, 2022",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit 5/1/2022 5/1/2022",
        id: "6",
        active: true,
      },
      {
        category: "random thought",
        created: "september 22, 2022",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        id: "7",
        active: true,
      },
    ];
  }

  addNote(category, content) {
    const date = new Date();

    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const noteObj = {
      category: category,
      created: `${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      content: content,
      id: `${Math.round(Math.random() * 100000)}`,
      active: true,
    };
    this.notes.push(noteObj);
  }

  getNoteIndex(id) {
    const noteId = this.notes.findIndex((note) => note.id === id);
    if (noteId >= 0) {
      return noteId;
    } else {
      throw new Error(`There is no note with id <${id}>`);
    }
  }

  getNote(id) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      return note;
    } else {
      throw new Error(`There is no note with id <${id}>`);
    }
  }

  deleteNote(id) {
    try {
      this.getNoteIndex(id);
      this.notes.splice(this.getNoteIndex(id), 1);
    } catch (err) {
      throw err;
    }
  }

  editNote(id, { category, content }) {
    this.notes[this.getNoteIndex(id)] = {
      ...this.notes[this.getNoteIndex(id)],
      category,
      content,
    };
  }

  getTotalActiveArchiveNotes() {
    return this.notes.reduce(
      function (total, note) {
        if (note.active) {
          total.active++;
          return total;
        } else {
          total.archived++;
          return total;
        }
      },
      { active: 0, archived: 0 }
    );
  }
}

const noteList = new NoteList();

module.exports = noteList;
