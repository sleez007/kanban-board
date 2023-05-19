import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '@kanbanboard/shared/board/data-access';

@Pipe({
  name: 'taskSummary',
})
export class TaskSummaryPipe implements PipeTransform {
  transform(value: ITask): unknown {
    const completedCount = value.subtasks.filter(
      (sub) => sub.isCompleted
    ).length;
    return `${completedCount} of ${value.subtasks.length} subtasks`;
  }
}
