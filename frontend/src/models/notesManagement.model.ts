interface Note {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export interface NoteStatus {
  _id: string;
  status: string;
  notes: Note[];
}
