import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SharedBoardDataAccessModule } from '@kanbanboard/shared/board/data-access';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, SharedBoardDataAccessModule, SharedUiMaterialModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
