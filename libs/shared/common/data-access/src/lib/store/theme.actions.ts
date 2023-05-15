import { createAction, props } from '@ngrx/store';
import { ThemeEntity } from './theme.models';

export const initTheme = createAction('[Theme Page] Init');

export const loadThemeSuccess = createAction(
  '[Theme/API] Load Theme Success',
  props<{ theme: ThemeEntity[] }>()
);

export const loadThemeFailure = createAction(
  '[Theme/API] Load Theme Failure',
  props<{ error: string }>()
);
