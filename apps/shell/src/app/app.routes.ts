import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('board/Module').then((m) => m.RemoteEntryModule),
  },
];
