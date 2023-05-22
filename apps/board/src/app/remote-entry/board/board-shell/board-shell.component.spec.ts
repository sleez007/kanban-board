import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardShellComponent } from './board-shell.component';
import {
  SharedBoardDataAccessModule,
  BoardFacade,
  IColumn,
} from '@kanbanboard/shared/board/data-access';
import { SharedCommonUiModule } from '@kanbanboard/shared/common/ui';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('BoardShellComponent', () => {
  let component: BoardShellComponent;
  let fixture: ComponentFixture<BoardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardShellComponent],
      imports: [
        StoreModule.forRoot(),
        SharedBoardDataAccessModule,
        SharedUiMaterialModule,
        SharedCommonUiModule,
        EffectsModule.forRoot([]),
      ],
      providers: [BoardFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure that the identity method returns the name property ', () => {
    const title = 'Todo';
    const task: IColumn = {
      name: title,
      tasks: [],
    };
    expect(component.identity(0, task)).toBe(title);
  });
});
