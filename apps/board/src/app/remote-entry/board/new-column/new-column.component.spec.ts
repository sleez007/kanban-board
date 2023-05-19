import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewColumnComponent } from './new-column.component';

describe('NewColumnComponent', () => {
  let component: NewColumnComponent;
  let fixture: ComponentFixture<NewColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
