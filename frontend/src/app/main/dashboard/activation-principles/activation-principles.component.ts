import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { PrincipleUpdateDialogComponent } from '../../dialog/principle-update-dialog/principle-update-dialog.component';
import { DIRECTIONS } from '../../../core/constants/directions';

@Component({
  selector: 'app-activation-principles',
  templateUrl: './activation-principles.component.html',
  styleUrls: ['./activation-principles.component.css']
})
export class ActivationPrinciplesComponent implements OnInit {

  Directions = DIRECTIONS;
  data: Array<any>;
  constructor(
    private _matDialog: MatDialog,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getActivationPrinciples();
  }

  getActivationPrinciples() {
    this._dashboardService.getActivationPrinciples().subscribe(res => {
      this.data = res;
    })
  }

  openUpdateDialog(item: any) {
    const dialogRef = this._matDialog.open(
      PrincipleUpdateDialogComponent, {
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
