import { Route } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const appRoutes: Route[] = [
  {
    component: MainLayoutComponent,
    path: '',
    loadChildren: () => import('board/Module').then((m) => m.RemoteEntryModule),
  },
];
