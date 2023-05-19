import { IBoard } from '../model';
import { BoardEntity } from './board.models';
import {
  boardAdapter,
  BoardPartialState,
  initialBoardState,
} from './board.reducer';
import * as BoardSelectors from './board.selectors';

describe('Board Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBoardId = (it: BoardEntity) => it.id;
  const createBoardEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      columns: [],
    } as IBoard);

  let state: BoardPartialState;

  beforeEach(() => {
    state = {
      board: boardAdapter.setAll(
        [createBoardEntity(1), createBoardEntity(2), createBoardEntity(3)],
        {
          ...initialBoardState,
          selectedId: 1,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Board Selectors', () => {
    it('selectAllBoard() should return the list of Board', () => {
      const results = BoardSelectors.selectAllBoard(state);
      const selId = getBoardId(results[0]);

      expect(results.length).toBe(3);
      expect(selId).toBe(1);
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = BoardSelectors.selectEntity(state) as BoardEntity;
      const selId = getBoardId(result);

      expect(selId).toBe(1);
    });

    it('selectBoardLoaded() should return the current "loaded" status', () => {
      const result = BoardSelectors.selectBoardLoaded(state);

      expect(result).toBe(true);
    });

    it('selectBoardError() should return the current "error" state', () => {
      const result = BoardSelectors.selectBoardError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
