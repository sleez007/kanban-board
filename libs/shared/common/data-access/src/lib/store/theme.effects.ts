import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ThemeActions from './theme.actions';
//import * as ThemeFeature from './theme.reducer';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.initTheme),
      switchMap(() => of(ThemeActions.loadThemeSuccess({ theme: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThemeActions.loadThemeFailure({ error }));
      })
    )
  );
}
