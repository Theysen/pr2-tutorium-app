import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotoverviewComponent } from './slotoverview.component';

describe('SlotoverviewComponent', () => {
  let component: SlotoverviewComponent;
  let fixture: ComponentFixture<SlotoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
