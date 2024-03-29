import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import {
  BoardFacade,
  SharedBoardDataAccessModule,
} from '@kanbanboard/shared/board/data-access';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '../../@kanban/layout/layout.module';
import { SidenavModule } from '../../@kanban/layout/sidenav/sidenav.module';
import { ToolbarModule } from '../../@kanban/layout/toolbar/toolbar.module';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let boardFacade: BoardFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedBoardDataAccessModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SidenavModule,
        ToolbarModule,
        LayoutModule,
      ],
      declarations: [MainLayoutComponent],
    }).compileComponents();

    boardFacade = TestBed.inject(BoardFacade);
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Ensure the board facade class loadInitialBoards method is called', fakeAsync(() => {
    const spy = jest.spyOn(boardFacade, 'loadInitialBoards');
    spy.mockImplementationOnce(() => {
      console.log('called spy');
    });
    component.ngOnInit();
    expect(spy).toBeCalledTimes(1);
  }));
});

//https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine
