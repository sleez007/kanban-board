import { ITask } from './task.model';

export interface IColumn {
  name: string;
  tasks: ITask[];
}

export type TColumnMini = Pick<IColumn, 'name'>;
