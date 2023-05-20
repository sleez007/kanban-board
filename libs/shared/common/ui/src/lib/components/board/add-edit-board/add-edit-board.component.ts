import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  styleUrls: ['./add-edit-board.component.scss'],
})
export class AddEditBoardComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly boardFacade: BoardFacade,
    private dialogRef: MatDialogRef<AddEditBoardComponent>
  ) {}
}
