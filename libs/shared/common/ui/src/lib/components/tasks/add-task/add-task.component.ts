import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardFacade, ITask } from '@kanbanboard/shared/board/data-access';
import { map, take } from 'rxjs';

@Component({
  selector: 'kanbanboard-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly boardFacade: BoardFacade,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: {
      isEdit: boolean;
      columnIndex: number;
      taskIndex: number;
    }
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

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.boardFacade.selectedBoard$
        .pipe(
          take(1),
          map(
            (d) => d?.columns[this.data.columnIndex].tasks[this.data.taskIndex]
          )
        )
        .subscribe((d) => d && this.patchFormData(d));
    }
  }

  patchFormData(task: ITask) {
    this.subTasks.clear();
    this.formGroup.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    task.subtasks.forEach((t) =>
      this.subTasks.push(
        this.fb.group({
          title: [t.title, [Validators.required]],
          isCompleted: [t.isCompleted],
        })
      )
    );
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

      if (this.data.isEdit) {
        this.boardFacade.editTask(
          this.data.columnIndex,
          this.data.taskIndex,
          task
        );
      } else {
        this.boardFacade.addTask(task);
      }
      this.dialogRef.close();
    }
  }
}
