import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { KhaiSonLapHuongUpdateComponent } from '../../dialog/khai-son-lap-huong-update/khai-son-lap-huong-update.component';
import { DIRECTIONS } from '../../../core/constants/directions';

@Component({
  selector: 'app-khai-son-lap-huong',
  templateUrl: './khai-son-lap-huong.component.html',
  styleUrls: ['./khai-son-lap-huong.component.css']
})
export class KhaiSonLapHuongComponent implements OnInit {

  data: Array<any>;
  attribute = 'xây mới';
  Directions = DIRECTIONS;
  constructor(
    private _matDialog: MatDialog,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getKhaiSonLapHuong();
  }

  getKhaiSonLapHuong() {
    this._dashboardService.getKhaiSonLapHuong(this.attribute).subscribe(res => {
      this.data = res;
    })
  }

  toggleChange($event) {
    this.attribute = $event.value;
    this.getKhaiSonLapHuong();
  }

  openUpdateDialog(item: any) {
    const dialogRef = this._matDialog.open(
      KhaiSonLapHuongUpdateComponent, {
        width: '50%',
        data: item
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      let indexToUpdate = this.data.findIndex(i => i.id === item.id);
      Object.assign(this.data[indexToUpdate], res);
    })
  }
}
