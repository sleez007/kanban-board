import { Component } from '@angular/core';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';
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

  constructor(private readonly boardFacade: BoardFacade) {}
  createNewTask() {
    console.log('clicked');
  }
}
