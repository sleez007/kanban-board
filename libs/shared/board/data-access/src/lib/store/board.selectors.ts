import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOARD_FEATURE_KEY, BoardState, boardAdapter } from './board.reducer';

// Lookup the 'Board' feature state managed by NgRx
export const selectBoardState =
  createFeatureSelector<BoardState>(BOARD_FEATURE_KEY);

const { selectAll, selectEntities } = boardAdapter.getSelectors();

export const selectBoardLoaded = createSelector(
  selectBoardState,
  (state: BoardState) => state.loaded
);

export const selectBoardError = createSelector(
  selectBoardState,
  (state: BoardState) => state.error
);

export const selectAllBoard = createSelector(
  selectBoardState,
  (state: BoardState) => selectAll(state)
);

export const selectBoardEntities = createSelector(
  selectBoardState,
  (state: BoardState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectBoardState,
  (state: BoardState) => state.selectedId
);

export const selectEntity = createSelector(
  selectBoardEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);