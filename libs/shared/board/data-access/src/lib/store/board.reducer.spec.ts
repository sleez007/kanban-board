import { Action } from '@ngrx/store';
import { boardActions, boardApiActions } from './board.actions';

import { BoardState, initialBoardState, boardReducer } from './board.reducer';
import { IBoard } from '../model';

describe('Board Reducer', () => {
  const createBoardEntity = (id: number, name = ''): IBoard => ({
    id,
    name: name || `name-${id}`,
    columns: [],
  });
  const boards = [
    createBoardEntity(1),
    createBoardEntity(2),
    createBoardEntity(3),
  ];

  describe('Valid board actions', () => {
    it('board should be empty when get initial action is dispatched', () => {
      const action = boardActions.getInitialData();
      const result: BoardState = boardReducer(initialBoardState, action);
      expect(result.loaded).toBe(false);
      expect(result.selectedId).toBe(undefined);
      expect(result.entities).toEqual({});
      expect(result.ids.length).toBe(0);
    });

    it('board reducer should contain 3 board items after initial load action', () => {
      const action = boardApiActions.getInitialDataSuccess({ data: boards });
      const result: BoardState = boardReducer(initialBoardState, action);
      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(3);
      expect(result.selectedId).toBe(boards[0].id);
      expect(result.ids).toEqual(boards.map((e) => e.id));
      expect(result.error).toBeNull();
    });

    it('error property should contain a string when get initial board failed', () => {
      const error = 'A network error occurred';
      const action = boardApiActions.getInitialDataFailure({ error });
      const result: BoardState = boardReducer(initialBoardState, action);
      expect(result.loaded).toBe(true);
      expect(result.selectedId).toBe(undefined);
      expect(result.entities).toEqual({});
      expect(result.ids.length).toBe(0);
      expect(result.error).toBe(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = boardReducer(initialBoardState, action);

      expect(result).toBe(initialBoardState);
    });
  });
});
