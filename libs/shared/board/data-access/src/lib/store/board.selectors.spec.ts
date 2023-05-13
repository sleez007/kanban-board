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
  const createBoardEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BoardEntity);

  let state: BoardPartialState;

  beforeEach(() => {
    state = {
      board: boardAdapter.setAll(
        [
          createBoardEntity('PRODUCT-AAA'),
          createBoardEntity('PRODUCT-BBB'),
          createBoardEntity('PRODUCT-CCC'),
        ],
        {
          ...initialBoardState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Board Selectors', () => {
    it('selectAllBoard() should return the list of Board', () => {
      const results = BoardSelectors.selectAllBoard(state);
      const selId = getBoardId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = BoardSelectors.selectEntity(state) as BoardEntity;
      const selId = getBoardId(result);

      expect(selId).toBe('PRODUCT-BBB');
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
