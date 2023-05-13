import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BoardActions from './board.actions';
//import * as BoardFeature from './board.reducer';
import * as BoardSelectors from './board.selectors';

@Injectable()
export class BoardFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BoardSelectors.selectBoardLoaded));
  allBoard$ = this.store.pipe(select(BoardSelectors.selectAllBoard));
  selectedBoard$ = this.store.pipe(select(BoardSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BoardActions.initBoard());
  }
}
