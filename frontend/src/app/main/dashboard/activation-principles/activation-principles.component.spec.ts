import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationPrinciplesComponent } from './activation-principles.component';

describe('ActivationPrinciplesComponent', () => {
  let component: ActivationPrinciplesComponent;
  let fixture: ComponentFixture<ActivationPrinciplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationPrinciplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationPrinciplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
