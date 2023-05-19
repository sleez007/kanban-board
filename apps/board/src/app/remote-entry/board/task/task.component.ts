import { Component, Input } from '@angular/core';
import { ITask } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input({ required: true }) task!: ITask;
  @Input({ required: true }) taskIndex!: number;
}
