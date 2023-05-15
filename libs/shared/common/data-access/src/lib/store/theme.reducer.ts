import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ThemeActions from './theme.actions';
import { ThemeEntity } from './theme.models';

export const THEME_FEATURE_KEY = 'theme';

export interface ThemeState extends EntityState<ThemeEntity> {
  selectedId?: string | number; // which Theme record has been selected
  loaded: boolean; // has the Theme list been loaded
  error?: string | null; // last known error (if any)
}

export interface ThemePartialState {
  readonly [THEME_FEATURE_KEY]: ThemeState;
}

export const themeAdapter: EntityAdapter<ThemeEntity> =
  createEntityAdapter<ThemeEntity>();

export const initialThemeState: ThemeState = themeAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialThemeState,
  on(ThemeActions.initTheme, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ThemeActions.loadThemeSuccess, (state, { theme }) =>
    themeAdapter.setAll(theme, { ...state, loaded: true })
  ),
  on(ThemeActions.loadThemeFailure, (state, { error }) => ({ ...state, error }))
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
  return reducer(state, action);
}
