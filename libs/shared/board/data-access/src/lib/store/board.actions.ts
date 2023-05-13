import { createAction, props } from '@ngrx/store';
import { BoardEntity } from './board.models';

export const initBoard = createAction('[Board Page] Init');

export const loadBoardSuccess = createAction(
  '[Board/API] Load Board Success',
  props<{ board: BoardEntity[] }>()
);

export const loadBoardFailure = createAction(
  '[Board/API] Load Board Failure',
  props<{ error: string }>()
);
