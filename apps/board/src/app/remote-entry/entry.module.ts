import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedBoardDataAccessModule } from '@kanbanboard/shared/board/data-access';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { SharedCommonUiModule } from '@kanbanboard/shared/common/ui';

import { remoteRoutes } from './entry.routes';
import { BoardColumnComponent } from './board/board-column/board-column.component';
import { ColumnTaskComponent } from './board/column-task/column-task.component';
import { NewColumnComponent } from './board/new-column/new-column.component';
import { BoardShellComponent } from './board/board-shell/board-shell.component';
import { TaskComponent } from './board/task/task.component';

@NgModule({
  declarations: [
    BoardColumnComponent,
    ColumnTaskComponent,
    NewColumnComponent,
    BoardShellComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    SharedBoardDataAccessModule,
    SharedUiMaterialModule,
    SharedCommonUiModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
