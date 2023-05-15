import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ThemeActions from './theme.actions';
import { ThemeEffects } from './theme.effects';

describe('ThemeEffects', () => {
  let actions: Observable<Action>;
  let effects: ThemeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ThemeEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ThemeEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ThemeActions.initTheme() });

      const expected = hot('-a-|', {
        a: ThemeActions.loadThemeSuccess({ theme: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
