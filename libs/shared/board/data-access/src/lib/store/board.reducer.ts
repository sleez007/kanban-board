import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BoardActions from './board.actions';
import { BoardEntity } from './board.models';

export const BOARD_FEATURE_KEY = 'board';

export interface BoardState extends EntityState<BoardEntity> {
  selectedId?: string | number; // which Board record has been selected
  loaded: boolean; // has the Board list been loaded
  error?: string | null; // last known error (if any)
}

export interface BoardPartialState {
  readonly [BOARD_FEATURE_KEY]: BoardState;
}

export const boardAdapter: EntityAdapter<BoardEntity> =
  createEntityAdapter<BoardEntity>();

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialBoardState,
  on(BoardActions.initBoard, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BoardActions.loadBoardSuccess, (state, { board }) =>
    boardAdapter.setAll(board, { ...state, loaded: true })
  ),
  on(BoardActions.loadBoardFailure, (state, { error }) => ({ ...state, error }))
);

export function boardReducer(state: BoardState | undefined, action: Action) {
  return reducer(state, action);
}
