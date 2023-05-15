import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ThemeActions from './theme.actions';
import { ThemeEffects } from './theme.effects';
import { ThemeFacade } from './theme.facade';
import { ThemeEntity } from './theme.models';
import {
  THEME_FEATURE_KEY,
  ThemeState,
  // initialThemeState,
  themeReducer,
} from './theme.reducer';
//import * as ThemeSelectors from './theme.selectors';

interface TestSchema {
  theme: ThemeState;
}

describe('ThemeFacade', () => {
  let facade: ThemeFacade;
  let store: Store<TestSchema>;
  const createThemeEntity = (id: string, name = ''): ThemeEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(THEME_FEATURE_KEY, themeReducer),
          EffectsModule.forFeature([ThemeEffects]),
        ],
        providers: [ThemeFacade],
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
      facade = TestBed.inject(ThemeFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTheme$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTheme$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadThemeSuccess` to manually update list
     */
    it('allTheme$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTheme$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ThemeActions.loadThemeSuccess({
          theme: [createThemeEntity('AAA'), createThemeEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTheme$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
