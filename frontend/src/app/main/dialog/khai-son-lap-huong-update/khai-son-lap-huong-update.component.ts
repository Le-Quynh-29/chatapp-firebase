import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DIRECTIONS } from '../../../core/constants/directions';
import { contentImageValidator } from '../../../core/utils/utils';

@Component({
  selector: 'app-khai-son-lap-huong-update',
  templateUrl: './khai-son-lap-huong-update.component.html',
  styleUrls: ['./khai-son-lap-huong-update.component.css']
})
export class KhaiSonLapHuongUpdateComponent implements OnInit {

  kslhForm: FormGroup;
  Editor = ClassicEditor;
  directions = DIRECTIONS;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<KhaiSonLapHuongUpdateComponent>,
    private _dashboardService: DashboardService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.kslhForm = this._formBuilder.group({
      content: [this.data.content, [Validators.required, contentImageValidator()]],
      _method: 'put'
    });
  }
  
  onSave() {
    this._dashboardService.updateKhaiSonLapHuong(this.kslhForm.value, this.data.id).subscribe(res => {
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Thông báo', content: 'Cập nhật thành công'}
      });
      this._dialogRef.close(res);
    }, err => {
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Lỗi', content: err.error.error}
      });
    })
  }
}
