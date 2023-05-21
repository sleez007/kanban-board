import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { boardActions } from './board.actions';

import * as BoardActions from './board.actions';
//import * as BoardFeature from './board.reducer';
import * as BoardSelectors from './board.selectors';
import { IBoard, ITask } from '../model';

@Injectable()
export class BoardFacade {
  constructor(private readonly store: Store) {}
  // private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BoardSelectors.selectBoardLoaded));
  allBoard$ = this.store.pipe(select(BoardSelectors.selectAllBoard));
  boardMini$ = this.store.pipe(select(BoardSelectors.selectMiniBoards));
  selectboardTotal$ = this.store.pipe(select(BoardSelectors.selectTotalBoards));
  selectedBoard$ = this.store.pipe(select(BoardSelectors.selectEntity));
  selectedBoardId$ = this.store.pipe(select(BoardSelectors.selectSelectedId));
  selectMiniColumns$ = this.store.pipe(
    select(BoardSelectors.selectMiniColumns)
  );

  /**
   * Use this action to retrieve the initial effect list
   */
  loadInitialBoards() {
    console.log('called me');
    this.store.dispatch(boardActions.getInitialData());
  }

  selectBoardById(id: number) {
    this.store.dispatch(boardActions.selectBoardById({ id }));
  }

  addNewBoard(board: IBoard) {
    this.store.dispatch(boardActions.createNewBoard({ data: board }));
  }

  editBoard(board: IBoard) {
    this.store.dispatch(boardActions.editBoard({ data: board }));
  }

  deleteBoard() {
    this.store.dispatch(boardActions.deleteBoard());
  }

  addTask(task: ITask) {
    this.store.dispatch(boardActions.addNewTask({ task }));
  }
  editTask(columnIndex: number, taskIndex: number, task: ITask) {
    this.store.dispatch(
      boardActions.editTask({ columnIndex, taskIndex, task })
    );
  }

  toggleSubtaskStatus(
    subtaskIndex: number,
    taskIndex: number,
    columnIndex: number
  ) {
    this.store.dispatch(
      boardActions.toggleSubTaskStatus({ subtaskIndex, taskIndex, columnIndex })
    );
  }
  deleteTask(columnIndex: number, taskIndex: number) {
    this.store.dispatch(boardActions.deleteTask({ columnIndex, taskIndex }));
  }

  dragTaskWithSameColumn(
    containerId: number,
    task: ITask,
    prevIndex: number,
    currentIndex: number
  ) {
    this.store.dispatch(
      boardActions.dragTaskWithSameColumn({
        containerId,
        task,
        prevIndex,
        currentIndex,
      })
    );
  }

  dragTaskToDifferentColumn(
    fromColumnId: number,
    toColumnId: number,
    prevIndex: number,
    currentIndex: number,
    task: ITask
  ) {
    this.store.dispatch(
      boardActions.dragTaskToDifferentColumn({
        fromColumnId,
        toColumnId,
        prevIndex,
        currentIndex,
        task,
      })
    );
  }

  // to be removed later
  init() {
    this.store.dispatch(BoardActions.initBoard());
  }
}
