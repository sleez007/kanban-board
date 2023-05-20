import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardFacade, ITask } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly boardFacade: BoardFacade,
    private dialogRef: MatDialogRef<AddTaskComponent>
  ) {}
  columns$ = this.boardFacade.selectMiniColumns$;

  formGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    subtasks: this.fb.array([
      this.fb.group({
        title: ['', [Validators.required]],
        isCompleted: [false],
      }),
    ]),
    status: ['', Validators.required],
  });

  get subTasks() {
    return this.formGroup.controls.subtasks;
  }

  addNewSubTask() {
    this.subTasks.push(
      this.fb.group({
        title: ['', [Validators.required]],
        isCompleted: [false],
      })
    );
  }

  removeSubTask(subTaskIndex: number) {
    this.subTasks.removeAt(subTaskIndex);
  }

  submitForm() {
    if (this.formGroup.valid) {
      const task: ITask = <Required<ITask>>this.formGroup.value;
      this.boardFacade.addTask(task);
      this.dialogRef.close();
    }
  }
}
