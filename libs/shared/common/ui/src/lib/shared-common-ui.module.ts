import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { AddEditBoardComponent } from './components/board/add-edit-board/add-edit-board.component';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedUiMaterialModule, ReactiveFormsModule],
  declarations: [AddTaskComponent, EditTaskComponent, AddEditBoardComponent],
  exports: [AddTaskComponent, EditTaskComponent, AddEditBoardComponent],
})
export class SharedCommonUiModule {}
