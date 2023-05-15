import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as BoardActions from './board.actions';
import { BoardEffects } from './board.effects';
import { BoardFacade } from './board.facade';
import { BoardEntity } from './board.models';
import {
  BOARD_FEATURE_KEY,
  BoardState,
  //initialBoardState,
  boardReducer,
} from './board.reducer';
import { firstValueFrom } from 'rxjs';
import { BoardService } from '../services/board.service';
import { HttpClientModule } from '@angular/common/http';
// import { NetworkHelperService } from '../data/network-helper.service';
// import * as BoardSelectors from './board.selectors';

interface TestSchema {
  board: BoardState;
}

describe('BoardFacade', () => {
  let facade: BoardFacade;
  let store: Store<TestSchema>;
  const createBoardEntity = (id: string, name = ''): BoardEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientModule,
          StoreModule.forFeature(BOARD_FEATURE_KEY, boardReducer),
          EffectsModule.forFeature([BoardEffects]),
        ],
        providers: [BoardFacade, BoardService],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BoardFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allBoard$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allBoard$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadBoardSuccess` to manually update list
     */
    it('allBoard$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allBoard$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        BoardActions.loadBoardSuccess({
          board: [createBoardEntity('AAA'), createBoardEntity('BBB')],
        })
      );

      list = await readFirst(facade.allBoard$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
