import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from 'src/app/core/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  sending: boolean = false;
  notificationForm: FormGroup;
  formData = new FormData();
  preview: any = null;
  constructor(
    private _dashboardService: DashboardService,
    private _dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.notificationForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(65)]],
      body: ['', [Validators.required, Validators.maxLength(240)]]
      // image: ['']
    });
  }

  onSubmit() {
    this.sending = true;
    this.formData.append('title', this.notificationForm.value.title);
    this.formData.append('body', this.notificationForm.value.body);
    this._dashboardService.sendNotification(this.formData)
    .subscribe(res => {
      this.formData = null;
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Thông báo', content: 'Gửi thông báo thành công'}
      });
      this._dialogRef.close(res);
      this.sending = false;
    }, err => {
      console.log(err)
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Lỗi', content: err.error.error}
      });
      this.sending = false;
    })
  }

  onFileChange(e) {
    const avatar = e.target.files[0];
    this.formData.append('image', avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }
}
