import { Component, OnInit } from '@angular/core';
import { BoardFacade } from '@kanbanboard/shared/board/data-access';

@Component({
  selector: 'kanbanboard-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private readonly boardFacade: BoardFacade) {}
  ngOnInit(): void {
    this.boardFacade.loadInitialBoards();
  }
}
