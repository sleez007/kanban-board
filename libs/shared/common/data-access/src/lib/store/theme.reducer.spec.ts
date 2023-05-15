import { Action } from '@ngrx/store';

import * as ThemeActions from './theme.actions';
import { ThemeEntity } from './theme.models';
import { ThemeState, initialThemeState, themeReducer } from './theme.reducer';

describe('Theme Reducer', () => {
  const createThemeEntity = (id: string, name = ''): ThemeEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Theme actions', () => {
    it('loadThemeSuccess should return the list of known Theme', () => {
      const theme = [
        createThemeEntity('PRODUCT-AAA'),
        createThemeEntity('PRODUCT-zzz'),
      ];
      const action = ThemeActions.loadThemeSuccess({ theme });

      const result: ThemeState = themeReducer(initialThemeState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = themeReducer(initialThemeState, action);

      expect(result).toBe(initialThemeState);
    });
  });
});
