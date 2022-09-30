import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { BaseSchema } from "yup";
import notesRepository from "../repositories/notesRepository";
import { INotesRepository, IEditNoteObj } from "../repositories/types";
import { INotesServices } from "./types";

class NotesServices implements INotesServices {
  repository: INotesRepository;
  constructor(repository: INotesRepository) {
    this.repository = repository;
  }

  addNoteSchema: BaseSchema = yup.object({
    body: yup
      .object({
        category: yup.string().min(1).required(),
        content: yup.string().min(3).required(),
      })
      .strict()
      .noUnknown(),
  });

  addNote = (body: IEditNoteObj) => {
    try {
      this.addNoteSchema.validateSync({
        body: body,
      });
      const { category, content }: IEditNoteObj = body;
      this.repository.addNote(category, content);
    } catch (err) {
      throw err;
    }
  };

  editNote = (body: IEditNoteObj, id: string) => {
    try {
      this.addNoteSchema.validateSync({ body: body });
      this.repository.editNote(id, body);
    } catch (err: any) {
      throw err;
    }
  };

  getAllNotes = () => {
    return this.repository.notes;
  };

  getStats = () => {
    return this.repository.getTotalActiveArchiveNotes();
  };

  deleteNote = (id: string) => {
    try {
      this.repository.deleteNote(id);
    } catch (err: any) {
      throw err;
    }
  };

  getNote = (id: string) => {
    try {
      return this.repository.getNote(id);
    } catch (err: any) {
      throw err;
    }
  };
}

const notesServices = new NotesServices(notesRepository);

export default notesServices;
