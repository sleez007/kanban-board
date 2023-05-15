import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as BoardActions from './board.actions';
import { BoardEffects } from './board.effects';
import { BoardService } from '../services/board.service';
import { HttpClientModule } from '@angular/common/http';

describe('BoardEffects', () => {
  let actions: Observable<Action>;
  let effects: BoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        BoardService,
        BoardEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BoardEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BoardActions.initBoard() });

      const expected = hot('-a-|', {
        a: BoardActions.loadBoardSuccess({ board: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
