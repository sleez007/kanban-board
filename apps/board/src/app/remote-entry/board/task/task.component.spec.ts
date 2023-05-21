import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskSummaryPipe } from '../../pipe/task-summary.pipe';
import { ITask } from '@kanbanboard/shared/board/data-access';

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
      declarations: [TaskComponent, TaskSummaryPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.task = task;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
