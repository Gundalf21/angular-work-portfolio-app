import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddComponent } from './work-add.component';

describe('WorkAddComponent', () => {
  let component: WorkAddComponent;
  let fixture: ComponentFixture<WorkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
