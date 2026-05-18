export enum NoteStatusEnum {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export interface INote {
  _id: string;
  title: string;
  description: string;
  status: NoteStatusEnum;
}

export interface INoteStatus {
  _id: string;
  status: NoteStatusEnum;
  notes: INote[];
}
