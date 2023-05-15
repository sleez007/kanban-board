import { createFeatureSelector, createSelector } from '@ngrx/store';
import { THEME_FEATURE_KEY, ThemeState, themeAdapter } from './theme.reducer';

// Lookup the 'Theme' feature state managed by NgRx
export const selectThemeState =
  createFeatureSelector<ThemeState>(THEME_FEATURE_KEY);

const { selectAll, selectEntities } = themeAdapter.getSelectors();

export const selectThemeLoaded = createSelector(
  selectThemeState,
  (state: ThemeState) => state.loaded
);

export const selectThemeError = createSelector(
  selectThemeState,
  (state: ThemeState) => state.error
);

export const selectAllTheme = createSelector(
  selectThemeState,
  (state: ThemeState) => selectAll(state)
);

export const selectThemeEntities = createSelector(
  selectThemeState,
  (state: ThemeState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectThemeState,
  (state: ThemeState) => state.selectedId
);

export const selectEntity = createSelector(
  selectThemeEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
