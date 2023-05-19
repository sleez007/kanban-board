import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
//import { immerOn } from 'ngrx-immer/store'
import { boardActions, boardApiActions } from './board.actions';

import * as BoardActions from './board.actions';
import { IBoard, ITask } from '../model';

export const BOARD_FEATURE_KEY = 'board';

export interface BoardState extends EntityState<IBoard> {
  // boards: IBoard[]
  selectedId?: number; // which Board record has been selected
  loaded: boolean; // has the Board list been loaded
  error?: string | null; // last known error (if any)
}

export interface BoardPartialState {
  readonly [BOARD_FEATURE_KEY]: BoardState;
}

export const boardAdapter: EntityAdapter<IBoard> =
  createEntityAdapter<IBoard>();

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialBoardState,
  on(boardActions.getInitialData, (state) => ({ ...state, loaded: false })),
  on(boardApiActions.getInitialDataSuccess, (state, { data }) =>
    boardAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null,
      selectedId: data[0].id ?? null,
    })
  ),
  on(boardActions.selectBoardById, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(boardApiActions.getInitialDataFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  })),
  on(
    boardActions.dragTaskWithSameColumn,
    (state, { containerId, prevIndex, currentIndex, task }) => {
      const board = structuredClone(state.entities[state.selectedId ?? -1]) as
        | IBoard
        | undefined;
      if (!board) return { ...state };
      const column = board.columns[containerId];
      removeDataFromPosition(task, prevIndex, column.tasks);
      moveDataToPosition(task, currentIndex, column.tasks);
      return boardAdapter.updateOne(
        { id: state.selectedId ?? -1, changes: board },
        { ...state }
      );
    }
  ),
  on(
    boardActions.dragTaskToDifferentColumn,
    (state, { fromColumnId, toColumnId, prevIndex, currentIndex, task }) => {
      const board = structuredClone(state.entities[state.selectedId ?? -1]) as
        | IBoard
        | undefined;
      if (!board) return { ...state };
      const fromColumn = board.columns[fromColumnId];
      const toColumn = board.columns[toColumnId];
      removeDataFromPosition(task, prevIndex, fromColumn.tasks);
      moveDataToPosition(task, currentIndex, toColumn.tasks);
      return boardAdapter.updateOne(
        { id: state.selectedId ?? -1, changes: board },
        { ...state }
      );
    }
  ),
  on(BoardActions.initBoard, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(BoardActions.loadBoardFailure, (state, { error }) => ({ ...state, error }))
);

export function boardReducer(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}

const removeDataFromPosition = (data: ITask, position: number, list: ITask[]) =>
  list.splice(position, 1);
const moveDataToPosition = (data: ITask, position: number, list: ITask[]) =>
  list.splice(position, 0, data);
