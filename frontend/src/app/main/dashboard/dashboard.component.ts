import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { IntroUpdateDialogComponent } from '../dialog/intro-update-dialog/intro-update-dialog.component';
import { NotificationDialogComponent } from '../dialog/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  checkLogin: any;
  constructor(
    private _matDialog: MatDialog,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getIntroduction();
    this.checkLogin = localStorage.getItem('currentUser');
  }

  getIntroduction() {
    this._dashboardService.getIntroduction().subscribe(res => {
      this.data = res;
    })
  }

  updateIntro() {
    const dialogRef = this._matDialog.open(
      IntroUpdateDialogComponent, {
        width: '50%',
        data: this.data
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.data = res;
      }
    })
  }

  notify() {
    const dialogRef = this._matDialog.open(
      NotificationDialogComponent, {
        width: '50%'
      }
    );
    dialogRef.afterClosed().subscribe();
  }
}
