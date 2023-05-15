import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { SidenavModule } from '../../@kanban/layout/sidenav/sidenav.module';
import { ToolbarModule } from '../../@kanban/layout/toolbar/toolbar.module';
import { LayoutModule } from '../../@kanban/layout/layout.module';
import { SharedBoardDataAccessModule } from '@kanbanboard/shared/board/data-access';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    SidenavModule,
    ToolbarModule,
    LayoutModule,
    SharedBoardDataAccessModule,
  ],
})
export class MainLayoutModule {}
