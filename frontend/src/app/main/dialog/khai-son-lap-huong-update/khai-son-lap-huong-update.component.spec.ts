import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaiSonLapHuongUpdateComponent } from './khai-son-lap-huong-update.component';

describe('KhaiSonLapHuongUpdateComponent', () => {
  let component: KhaiSonLapHuongUpdateComponent;
  let fixture: ComponentFixture<KhaiSonLapHuongUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhaiSonLapHuongUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhaiSonLapHuongUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
