import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as BoardActions from './board.actions';
import { boardActions, boardApiActions } from './board.actions';
import { BoardService } from '../services/board.service';

// import * as BoardFeature from './board.reducer';

@Injectable()
export class BoardEffects {
  constructor(
    private readonly actions$: Actions,
    private boardService: BoardService
  ) {}

  getInitialData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.getinitialdata),
      switchMap(() =>
        this.boardService.getBoards().pipe(
          map((data) => boardApiActions.getinitialdatasuccess({ data })),
          catchError((error) =>
            of(boardApiActions.getinitialdatafailure({ error }))
          )
        )
      )
    )
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.initBoard),
      switchMap(() => of(BoardActions.loadBoardSuccess({ board: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(BoardActions.loadBoardFailure({ error }));
      })
    )
  );
}
