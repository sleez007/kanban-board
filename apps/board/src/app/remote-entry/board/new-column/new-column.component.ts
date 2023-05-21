import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBoardComponent } from '@kanbanboard/shared/common/ui';

@Component({
  selector: 'kanbanboard-new-column',
  templateUrl: './new-column.component.html',
  styleUrls: ['./new-column.component.scss'],
})
export class NewColumnComponent {
  constructor(private readonly dialog: MatDialog) {}

  editBoard() {
    this.dialog.open(AddEditBoardComponent, {
      height: '70vh',
      width: '600px',
      data: { isEdit: true },
    });
  }
}
