import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardFacade, IColumn } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-board-shell',
  templateUrl: './board-shell.component.html',
  styleUrls: ['./board-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardShellComponent {
  boards$ = this.boardFacade.selectedBoard$;
  constructor(private readonly boardFacade: BoardFacade) {}

  identity(index: number, item: IColumn) {
    return item.name;
  }
}
