import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditBoardComponent } from './add-edit-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SharedBoardDataAccessModule,
  BoardFacade,
} from '@kanbanboard/shared/board/data-access';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditBoardComponent', () => {
  describe('Create new form state', () => {
    let component: AddEditBoardComponent;
    let fixture: ComponentFixture<AddEditBoardComponent>;
    let facade: BoardFacade;

    const data = { isEdit: true };
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AddEditBoardComponent],
        imports: [
          SharedBoardDataAccessModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          SharedUiMaterialModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
        ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {
                console.log('click');
              },
            },
          },
          { provide: MAT_DIALOG_DATA, useValue: data },
          BoardFacade,
        ],
      }).compileComponents();
      facade = TestBed.inject(BoardFacade);
      fixture = TestBed.createComponent(AddEditBoardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('ensure the submit button calls the edit board board facade method when form is in edit mode and is valid', () => {
      const spy = jest.spyOn(facade, 'editBoard');
      component.formGroup.patchValue({
        name: 'Test',
        columns: [{ tasks: [], name: 'Todo' }],
      });
      expect(component.formGroup.valid).toBeTruthy();
      component.submitForm();
      //fixture.detectChanges()
      expect(spy).toBeCalled();
    });
  });

  describe('Create new form state', () => {
    let component: AddEditBoardComponent;
    let fixture: ComponentFixture<AddEditBoardComponent>;
    let facade: BoardFacade;
    const data = { isEdit: false };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AddEditBoardComponent],
        imports: [
          SharedBoardDataAccessModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          SharedUiMaterialModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
        ],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {
                console.log('click');
              },
            },
          },
          { provide: MAT_DIALOG_DATA, useValue: data },
          BoardFacade,
        ],
      }).compileComponents();
      facade = TestBed.inject(BoardFacade);
      fixture = TestBed.createComponent(AddEditBoardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should verify that forms initial state is invalid', () => {
      expect(component.formGroup.invalid).toBeTruthy();
      expect(component.formGroup.touched).toBe(false);
      expect(component.formGroup.controls.name.value).toBe('');
      expect(typeof component.formGroup.controls.id.value).toBe('number');
      const el = fixture.nativeElement.querySelector('#submit');
      expect(el.disabled).toBeTruthy();
    });

    it('ensure the submit method does nothing while form is invalid', () => {
      const spy = jest.spyOn(facade, 'addNewBoard');
      const spy2 = jest.spyOn(facade, 'editBoard');
      const el = fixture.nativeElement.querySelector('#submit');
      el.dispatchEvent(new Event('click'));
      expect(spy).not.toBeCalled();
      expect(spy2).not.toBeCalled();
    });

    it('ensure the submit button calls the addnew board facade method when form is not in edit mode and is valid', () => {
      const spy = jest.spyOn(facade, 'addNewBoard');
      component.formGroup.patchValue({
        name: 'Test',
        columns: [{ tasks: [], name: 'Todo' }],
      });
      expect(component.formGroup.valid).toBeTruthy();
      component.submitForm();
      //fixture.detectChanges()
      expect(spy).toBeCalled();
    });

    it('ensure calling add control adds a control from the formArray', () => {
      component.formGroup.patchValue({
        name: 'Test',
        columns: [{ tasks: [], name: 'Todo' }],
      });

      expect(component.columns.length).toBe(1);
      component.addNewColumn();
      //fixture.detectChanges()
      //tick()
      expect(component.columns.length).toBe(2);
    });

    it('ensure calling remove control removes a control from the formArray', () => {
      component.formGroup.patchValue({
        name: 'Test',
        columns: [{ tasks: [], name: 'Todo' }],
      });
      component.removeColumn(0);
      expect(component.columns.length).toBe(0);
    });
  });
});
