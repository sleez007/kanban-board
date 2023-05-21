import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { AddEditBoardComponent } from './components/board/add-edit-board/add-edit-board.component';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskSummaryPipe } from './pipe/task-summary.pipe';

@NgModule({
  imports: [CommonModule, SharedUiMaterialModule, ReactiveFormsModule],
  declarations: [
    AddTaskComponent,
    EditTaskComponent,
    AddEditBoardComponent,
    TaskSummaryPipe,
  ],
  exports: [
    AddTaskComponent,
    EditTaskComponent,
    AddEditBoardComponent,
    TaskSummaryPipe,
  ],
})
export class SharedCommonUiModule {}
