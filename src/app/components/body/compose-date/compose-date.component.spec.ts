import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeDateComponent } from './compose-date.component';

describe('ComposeDateComponent', () => {
  let component: ComposeDateComponent;
  let fixture: ComponentFixture<ComposeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
