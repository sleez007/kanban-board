import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NewColumnComponent } from './new-column.component';
import { SharedUiMaterialModule } from '@kanbanboard/shared/ui-material';
import { MatDialog } from '@angular/material/dialog';

describe('NewColumnComponent', () => {
  let component: NewColumnComponent;
  let fixture: ComponentFixture<NewColumnComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewColumnComponent],
      imports: [SharedUiMaterialModule],
    }).compileComponents();

    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(NewColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ensures that clicking on the element tiggers a calls the matDialog open method', fakeAsync(() => {
    const div = fixture.nativeElement.querySelector('div');
    const spy = jest.spyOn(matDialog, 'open');
    div.dispatchEvent(new Event('click'));
    //tick()
    expect(spy).toBeCalled();
  }));
});
