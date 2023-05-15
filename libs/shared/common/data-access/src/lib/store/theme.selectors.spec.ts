import { ThemeEntity } from './theme.models';
import {
  themeAdapter,
  ThemePartialState,
  initialThemeState,
} from './theme.reducer';
import * as ThemeSelectors from './theme.selectors';

describe('Theme Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getThemeId = (it: ThemeEntity) => it.id;
  const createThemeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ThemeEntity);

  let state: ThemePartialState;

  beforeEach(() => {
    state = {
      theme: themeAdapter.setAll(
        [
          createThemeEntity('PRODUCT-AAA'),
          createThemeEntity('PRODUCT-BBB'),
          createThemeEntity('PRODUCT-CCC'),
        ],
        {
          ...initialThemeState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Theme Selectors', () => {
    it('selectAllTheme() should return the list of Theme', () => {
      const results = ThemeSelectors.selectAllTheme(state);
      const selId = getThemeId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ThemeSelectors.selectEntity(state) as ThemeEntity;
      const selId = getThemeId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectThemeLoaded() should return the current "loaded" status', () => {
      const result = ThemeSelectors.selectThemeLoaded(state);

      expect(result).toBe(true);
    });

    it('selectThemeError() should return the current "error" state', () => {
      const result = ThemeSelectors.selectThemeError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
