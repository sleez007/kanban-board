import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';
import { AddTaskComponent } from '@kanbanboard/shared/common/ui';
import { combineLatestWith, map } from 'rxjs';

@Component({
  selector: 'kanbanboard-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  selectedBoardTitle$ = this.boardFacade.boardMini$.pipe(
    combineLatestWith(this.boardFacade.selectedBoardId$),
    map(([board, id]) => board.find((b) => b?.id == id)?.name)
  );

  constructor(
    private readonly boardFacade: BoardFacade,
    public readonly dialog: MatDialog
  ) {}
  createNewTask() {
    this.dialog.open(AddTaskComponent, { height: '70vh', width: '600px' });
  }
}
