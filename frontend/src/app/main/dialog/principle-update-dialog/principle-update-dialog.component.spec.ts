import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipleUpdateDialogComponent } from './principle-update-dialog.component';

describe('PrincipleUpdateDialogComponent', () => {
  let component: PrincipleUpdateDialogComponent;
  let fixture: ComponentFixture<PrincipleUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipleUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipleUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
