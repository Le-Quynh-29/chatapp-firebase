import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  message: string | Array<string> = [];
  dataDialog: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
    this.dataDialog = data;
  }

  ngOnInit(): void {
    if (this.dataDialog) {
      this.message = this.dataDialog.message || this.message;
    }
  }

  checkIsArray(val: any): boolean {
    return Array.isArray(val);
  }
}
