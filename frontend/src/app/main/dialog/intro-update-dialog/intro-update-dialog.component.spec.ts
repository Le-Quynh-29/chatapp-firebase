import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroUpdateDialogComponent } from './intro-update-dialog.component';

describe('IntroUpdateDialogComponent', () => {
  let component: IntroUpdateDialogComponent;
  let fixture: ComponentFixture<IntroUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
