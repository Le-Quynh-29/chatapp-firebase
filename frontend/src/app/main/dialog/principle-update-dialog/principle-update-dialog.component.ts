import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DIRECTIONS } from '../../../core/constants/directions';
import { contentImageValidator } from '../../../core/utils/utils';

@Component({
  selector: 'app-principle-update-dialog',
  templateUrl: './principle-update-dialog.component.html',
  styleUrls: ['./principle-update-dialog.component.css']
})
export class PrincipleUpdateDialogComponent implements OnInit {

  directions = DIRECTIONS;
  principleForm: FormGroup;
  Editor = ClassicEditor;
  phases = [{name: 'kim', id: 1}, {name: 'mộc', id: 2}, {name: 'thủy', id: 3}, {name: 'hỏa', id: 4}, {name: 'thổ', id: 5}]
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PrincipleUpdateDialogComponent>,
    private _dashboardService: DashboardService,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.principleForm = this._formBuilder.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(20)]],
      phase: [this.data.phase, [Validators.required]],
      content: [this.data.content, [Validators.required, contentImageValidator()]],
      _method: ['put']
    });
  }

  onSave() {
    console.log(this.principleForm.value);
    this._dashboardService.updateActivationPrinciple(this.principleForm.value, this.data.id).subscribe(res => {
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
