import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BoardFacade, ITask } from '@kanbanboard/shared/board/data-access';
import { map } from 'rxjs';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'kanbanboard-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  columns$ = this.boardFacade.selectMiniColumns$;
  taskInfo$ = this.boardFacade.selectedBoard$.pipe(
    map((d) => d?.columns[this.data.columnIndex].tasks[this.data.taskIndex])
  );
  constructor(
    private readonly boardFacade: BoardFacade,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    public readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: { taskIndex: number; columnIndex: number }
  ) {}

  toggleSubtaskStatus(index: number) {
    this.boardFacade.toggleSubtaskStatus(
      index,
      this.data.taskIndex,
      this.data.columnIndex
    );
  }

  moveTaskToNewColumn(newColumnIndex: number, task: ITask) {
    //alert(newColumnIndex);
    this.boardFacade.dragTaskToDifferentColumn(
      this.data.columnIndex,
      newColumnIndex,
      this.data.taskIndex,
      0,
      task
    );
    this.dialogRef.close();
  }

  deleteTask() {
    this.boardFacade.deleteTask(this.data.columnIndex, this.data.taskIndex);
    this.dialogRef.close();
  }

  editTask() {
    this.dialog.open(AddTaskComponent, {
      maxHeight: '70vh',
      width: '600px',
      data: {
        isEdit: true,
        columnIndex: this.data.columnIndex,
        taskIndex: this.data.taskIndex,
      },
    });
    this.dialogRef.close();
  }
}
