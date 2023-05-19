import { Route } from '@angular/router';
import { BoardShellComponent } from './board/board-shell/board-shell.component';

export const remoteRoutes: Route[] = [
  { path: '', component: BoardShellComponent },
];
