import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationItemsComponent } from './activation-items.component';

describe('ActivationItemsComponent', () => {
  let component: ActivationItemsComponent;
  let fixture: ComponentFixture<ActivationItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
