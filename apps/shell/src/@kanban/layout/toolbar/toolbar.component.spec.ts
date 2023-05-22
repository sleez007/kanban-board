import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { EffectsModule } from '@ngrx/effects';
import {
  SharedBoardDataAccessModule,
  BoardFacade,
} from '@kanbanboard/shared/board/data-access';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { SharedCommonUiModule } from '@kanbanboard/shared/common/ui';
import { StoreModule } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let dialogModal: MatDialog;
  let facade: BoardFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        StoreModule.forRoot(),
        SharedBoardDataAccessModule,
        SharedUiMaterialModule,
        SharedCommonUiModule,
        EffectsModule.forRoot([]),
      ],
      providers: [BoardFacade],
    }).compileComponents();
    facade = TestBed.inject(BoardFacade);
    dialogModal = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure the delete button is not visible at start up', () => {
    const deleteButton = fixture.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeNull();
  });

  it('should ensure clicking the add new button opens the modal', () => {
    const spy = jest.spyOn(dialogModal, 'open');
    const addNewButton = fixture.nativeElement.querySelector('.btn');
    addNewButton.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should ensure calling the deleteboard method calls facade delete method', () => {
    const spy = jest.spyOn(facade, 'deleteBoard');
    component.deleteBoard();
    expect(spy).toHaveBeenCalled();
  });

  it('should ensure calling the editboard method should pop the modal', () => {
    const spy = jest.spyOn(dialogModal, 'open');
    component.editBoard();
    expect(spy).toHaveBeenCalled();
  });
});
