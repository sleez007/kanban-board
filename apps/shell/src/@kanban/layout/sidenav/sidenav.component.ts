import { Component } from '@angular/core';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  boardsMini$ = this.boardFacade.boardMini$;
  totalBoards$ = this.boardFacade.selectboardTotal$;
  selectedBoardId$ = this.boardFacade.selectedBoardId$;
  constructor(private readonly boardFacade: BoardFacade) {}

  selectedBoardById(id: number) {
    this.boardFacade.selectBoardById(id);
  }
}
