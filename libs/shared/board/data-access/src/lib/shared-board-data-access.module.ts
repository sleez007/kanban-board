import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBoard from './store/board.reducer';
import { BoardEffects } from './store/board.effects';
import { BoardFacade } from './store/board.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBoard.BOARD_FEATURE_KEY, fromBoard.boardReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  providers: [BoardFacade],
})
export class SharedBoardDataAccessModule {}
