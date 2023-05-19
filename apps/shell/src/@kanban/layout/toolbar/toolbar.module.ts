import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { SharedBoardDataAccessModule } from '@kanbanboard/shared/board/data-access';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SharedBoardDataAccessModule, SharedUiMaterialModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
