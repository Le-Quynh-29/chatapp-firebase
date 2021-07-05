import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUpdateDialogComponent } from './item-update-dialog.component';

describe('ItemUpdateDialogComponent', () => {
  let component: ItemUpdateDialogComponent;
  let fixture: ComponentFixture<ItemUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
