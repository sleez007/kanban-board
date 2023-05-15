import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ThemeActions from './theme.actions';
//import * as ThemeFeature from './theme.reducer';
import * as ThemeSelectors from './theme.selectors';

@Injectable()
export class ThemeFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ThemeSelectors.selectThemeLoaded));
  allTheme$ = this.store.pipe(select(ThemeSelectors.selectAllTheme));
  selectedTheme$ = this.store.pipe(select(ThemeSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ThemeActions.initTheme());
  }
}
