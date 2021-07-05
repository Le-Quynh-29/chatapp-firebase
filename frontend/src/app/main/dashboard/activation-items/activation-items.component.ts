import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { ItemUpdateDialogComponent } from '../../dialog/item-update-dialog/item-update-dialog.component';
import { DIRECTIONS } from '../../../core/constants/directions';

@Component({
  selector: 'app-activation-items',
  templateUrl: './activation-items.component.html',
  styleUrls: ['./activation-items.component.css']
})
export class ActivationItemsComponent implements OnInit {

  Directions = DIRECTIONS;
  items: any;
  tmpImage: any;
  constructor(
    private _matDialog: MatDialog,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getActivationItems();
  }

  getActivationItems() {
    this._dashboardService.getActivationItems().subscribe(res => {
      this.items = res;
    });
  }

  openItemUpdateDialog(item: any) {
    const dialogRef = this._matDialog.open(
      ItemUpdateDialogComponent, {
        width: '50%',
        data: item
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      let indexToUpdate = this.items.findIndex(i => i.id === item.id);
      Object.assign(this.items[indexToUpdate], res);
    })
  }
}
