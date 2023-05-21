import { Component, Input } from '@angular/core';
import {
  BoardFacade,
  IColumn,
  ITask,
} from '@kanbanboard/shared/board/data-access';
import { UtilWare } from '../../../util/Util';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '@kanbanboard/shared/common/ui';

@Component({
  selector: 'kanbanboard-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input({ required: true }) column!: IColumn;
  @Input({ required: true }) columnIndex!: number;
  color: string = UtilWare.generateRandomHexColorValue();

  constructor(
    private readonly boardFacade: BoardFacade,
    public readonly dialog: MatDialog
  ) {}

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      this.boardFacade.dragTaskWithSameColumn(
        parseInt(event.previousContainer.id),
        event.container.data[event.previousIndex],
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.boardFacade.dragTaskToDifferentColumn(
        parseInt(event.previousContainer.id),
        parseInt(event.container.id),
        event.previousIndex,
        event.currentIndex,
        event.previousContainer.data[event.previousIndex]
      );
    }
  }

  openTask(taskIndex: number) {
    this.dialog.open(EditTaskComponent, {
      maxHeight: '70vh',
      width: '600px',
      data: { taskIndex, columnIndex: this.columnIndex },
    });
  }

  identity(index: number, item: ITask) {
    return item.title;
  }
}
