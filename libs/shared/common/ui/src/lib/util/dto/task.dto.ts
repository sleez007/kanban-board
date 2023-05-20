import { ITask } from '@kanbanboard/shared/board/data-access';

type createForm = {
  title: string | null;
  description: string | null;
  subTasks: Partial<{
    title: string | null;
    isCompleted: boolean | null;
  }>[];
  status: string | null;
};

export class TaskDTO {
  static mapFormToDomainModel(form: createForm, column: number) {
    const data: ITask = {
      title: '',
      description: '',
      status: false,
      subtasks: [],
    };
    return { data, column };
  }
}
