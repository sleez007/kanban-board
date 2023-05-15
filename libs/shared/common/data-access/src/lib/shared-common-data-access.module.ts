import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTheme from './store/theme.reducer';
import { ThemeEffects } from './store/theme.effects';
import { ThemeFacade } from './store/theme.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTheme.THEME_FEATURE_KEY, fromTheme.themeReducer),
    EffectsModule.forFeature([ThemeEffects]),
  ],
  providers: [ThemeFacade],
})
export class SharedCommonDataAccessModule {}
