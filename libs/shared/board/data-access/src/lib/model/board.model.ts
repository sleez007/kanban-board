import { IColumn } from './column.model';

export interface IBoard {
  id: number;
  name: string;
  columns: IColumn[];
}

export type TBoardMini = Pick<IBoard, 'id' | 'name'>;
