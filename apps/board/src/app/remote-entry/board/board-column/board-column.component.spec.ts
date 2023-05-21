import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardColumnComponent } from './board-column.component';
import { StoreModule } from '@ngrx/store';
import {
  BoardFacade,
  ITask,
  SharedBoardDataAccessModule,
} from '@kanbanboard/shared/board/data-access';
import { SharedCommonUiModule } from '@kanbanboard/shared/common/ui';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { EffectsModule } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

describe('BoardColumnComponent', () => {
  let component: BoardColumnComponent;
  let fixture: ComponentFixture<BoardColumnComponent>;
  let matDialog: MatDialog;
  let facade: BoardFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardColumnComponent],
      imports: [
        StoreModule.forRoot(),
        SharedBoardDataAccessModule,
        SharedUiMaterialModule,
        SharedCommonUiModule,
        EffectsModule.forRoot([]),
      ],
      providers: [BoardFacade],
    }).compileComponents();
    matDialog = TestBed.inject(MatDialog);
    facade = TestBed.inject(BoardFacade);
    fixture = TestBed.createComponent(BoardColumnComponent);
    component = fixture.componentInstance;
    component.column = {
      name: 'Hello',
      tasks: [],
    };
    component.columnIndex = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ensure that the dialog open method was called', () => {
    const spy = jest.spyOn(matDialog, 'open');
    component.openTask(0);
    expect(spy).toBeCalledTimes(1);
  });

  it('should ensure that the color property contains 7 characters', () => {
    expect(component.color.length).toBe(7);
  });

  it('should ensure that the identity method returns the title property ', () => {
    const title = 'Book a flight';
    const task: ITask = {
      title,
      description: '',
      status: 'Todo',
      subtasks: [],
    };
    expect(component.identity(0, task)).toBe(title);
  });

  it('should ensure we dispatch dragTaskWithSameColumn when item is dropped in same column', () => {
    const task: ITask[] = [
      {
        title: '',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
    ];
    const container = {
      data: task,
      id: 0,
    };

    const d = {
      previousIndex: 0,
      currentIndex: 0,
      previousContainer: container,
      container,
    } as unknown as CdkDragDrop<ITask[]>;

    const spy = jest.spyOn(facade, 'dragTaskWithSameColumn');
    component.drop(d);
    expect(spy).toBeCalled();
  });

  it('should ensure we dispatch dragTaskToDifferentColumn when item is dropped in different column', () => {
    const task: ITask[] = [
      {
        title: '',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
    ];
    const container = {
      data: task,
      id: 0,
    };
    const d = {
      previousIndex: 0,
      currentIndex: 0,
      previousContainer: {
        data: task,
        id: 0,
      },
      container,
    } as unknown as CdkDragDrop<ITask[]>;

    const spy = jest.spyOn(facade, 'dragTaskToDifferentColumn');
    component.drop(d);
    expect(spy).toBeCalled();
  });
});
