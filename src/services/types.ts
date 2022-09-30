import {
  INotesRepository,
  IEditNoteObj,
  INoteObj,
  ISummary,
} from "../repositories/types";
import { BaseSchema } from "yup";

export interface INotesServices {
  repository: INotesRepository;
  addNoteSchema: BaseSchema;
  addNote(body: IEditNoteObj): void;
  getAllNotes(): INoteObj[];
  getStats(): ISummary;
  deleteNote(id: string): void | Error;
  editNote(body: IEditNoteObj, id: string): void | Error;
  getNote(id: string): INoteObj | Error;
}
