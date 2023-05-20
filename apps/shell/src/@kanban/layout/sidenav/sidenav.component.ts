import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';
import { AddEditBoardComponent } from '@kanbanboard/shared/common/ui';

@Component({
  selector: 'kanbanboard-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  boardsMini$ = this.boardFacade.boardMini$;
  totalBoards$ = this.boardFacade.selectboardTotal$;
  selectedBoardId$ = this.boardFacade.selectedBoardId$;
  constructor(
    private readonly boardFacade: BoardFacade,
    public readonly dialog: MatDialog
  ) {}

  selectedBoardById(id: number) {
    this.boardFacade.selectBoardById(id);
  }

  createBoard() {
    this.dialog.open(AddEditBoardComponent, { height: '70vh', width: '600px' });
  }
}
