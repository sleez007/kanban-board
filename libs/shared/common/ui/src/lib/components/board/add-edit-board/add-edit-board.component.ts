import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BoardFacade,
  IBoard,
  ITask,
} from '@kanbanboard/shared/board/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'kanbanboard-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  styleUrls: ['./add-edit-board.component.scss'],
})
export class AddEditBoardComponent implements OnInit {
  submitBtnText = 'Create New Board';
  title = 'Add New Board';

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardFacade: BoardFacade,
    private dialogRef: MatDialogRef<AddEditBoardComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { isEdit: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) this.patchFormValue();
  }

  patchFormValue() {
    this.title = 'Edit Board';
    this.submitBtnText = 'Save Changes';
    this.boardFacade.selectedBoard$.pipe(take(1)).subscribe((d) => {
      this.columns.clear();
      this.formGroup.patchValue({
        name: d?.name,
        id: d?.id,
      });
      d?.columns.forEach((i) =>
        this.columns.push(
          this.fb.group({
            name: [i.name, [Validators.required]],
            tasks: [i.tasks],
          })
        )
      );
    });
  }

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    id: [Date.now()],
    columns: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        tasks: [<ITask[]>[]],
      }),
    ]),
  });

  get columns() {
    return this.formGroup.controls.columns;
  }

  addNewColumn() {
    this.columns.push(
      this.fb.group({ name: ['', [Validators.required]], tasks: [<ITask[]>[]] })
    );
  }

  removeColumn(subTaskIndex: number) {
    this.columns.removeAt(subTaskIndex);
  }

  submitForm() {
    const board: IBoard = <Required<IBoard>>this.formGroup.value;
    if (this.formGroup.valid) {
      if (this.data.isEdit) {
        this.boardFacade.editBoard(board);
      } else {
        this.boardFacade.addNewBoard(board);
      }
      this.dialogRef.close();
    }
  }
}
