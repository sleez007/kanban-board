import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { boardActions } from './board.actions';

import * as BoardActions from './board.actions';
//import * as BoardFeature from './board.reducer';
import * as BoardSelectors from './board.selectors';

@Injectable()
export class BoardFacade {
  constructor(private readonly store: Store) {}
  // private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BoardSelectors.selectBoardLoaded));
  allBoard$ = this.store.pipe(select(BoardSelectors.selectAllBoard));
  selectedBoard$ = this.store.pipe(select(BoardSelectors.selectEntity));

  /**
   * Use this action to retrieve the initial effect list
   */
  loadInitialBoards() {
    console.log('called me');
    this.store.dispatch(boardActions.getinitialdata());
  }

  // to be removed later
  init() {
    this.store.dispatch(BoardActions.initBoard());
  }
}
