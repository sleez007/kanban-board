import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { BoardEntity } from './board.models';
import { IBoard } from '../model';

export const initBoard = createAction('[Board Page] Init');

export const loadBoardSuccess = createAction(
  '[Board/API] Load Board Success',
  props<{ board: BoardEntity[] }>()
);

export const loadBoardFailure = createAction(
  '[Board/API] Load Board Failure',
  props<{ error: string }>()
);

export const boardActions = createActionGroup({
  source: 'BOARD UI ACTIONS',
  events: {
    getInitialData: emptyProps(),
    createNewBoard: props<{ data: IBoard }>(),
    addNewColumn: emptyProps(),
    deleteBoard: emptyProps(),
    markTaskAsDone: props<{ taskId: number; subTaskId: number }>(),
  },
});

export const boardApiActions = createActionGroup({
  source: 'BOARD API ACTIONS',
  events: {
    getInitialDataSuccess: props<{ data: IBoard[] }>(),
    getInitialDataFailure: props<{ error: string }>(),
  },
});
