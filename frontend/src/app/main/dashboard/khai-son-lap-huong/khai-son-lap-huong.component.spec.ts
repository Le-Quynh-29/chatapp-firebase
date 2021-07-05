import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhaiSonLapHuongComponent } from './khai-son-lap-huong.component';

describe('KhaiSonLapHuongComponent', () => {
  let component: KhaiSonLapHuongComponent;
  let fixture: ComponentFixture<KhaiSonLapHuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhaiSonLapHuongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhaiSonLapHuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
