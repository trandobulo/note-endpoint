export interface INoteObj {
  category: string;
  created: string;
  content: string;
  id: string;
  active: boolean;
}

export interface IEditNoteObj {
  category: string;
  content: string;
}

export interface INotesRepository {
  notes: INoteObj[];
  addNote(category: string, content: string): void;
  getNoteIndex(id: string): number;
  getNote(id: string): INoteObj | Error;
  deleteNote(id: string): void;
  editNote(id: string, { category, content }: IEditNoteObj): void;
  getTotalActiveArchiveNotes(): ISummary;
}

export interface ISummary {
  active: number;
  archived: number;
}
