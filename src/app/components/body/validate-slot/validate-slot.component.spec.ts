import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSlotComponent } from './validate-slot.component';

describe('ValidateSlotComponent', () => {
  let component: ValidateSlotComponent;
  let fixture: ComponentFixture<ValidateSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
