import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { ITask } from '@kanbanboard/shared/board/data-access';
import { SharedCommonUiModule } from '@kanbanboard/shared/common/ui';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const task: ITask = {
    title: 'Title',
    description: '',
    status: 'Todo',
    subtasks: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [SharedCommonUiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ensure the h3 tag contains the task title', () => {
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toContain(task.title);
  });

  it('ensure the p contains 0 of 0 subtasks', () => {
    const result = '0 of 0 subtasks';
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain(result);
  });
});
