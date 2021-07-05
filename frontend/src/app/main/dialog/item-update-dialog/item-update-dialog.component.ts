import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from 'src/app/core/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { DIRECTIONS } from '../../../core/constants/directions';
import { contentImageValidator } from '../../../core/utils/utils';

@Component({
  selector: 'app-item-update-dialog',
  templateUrl: './item-update-dialog.component.html',
  styleUrls: ['./item-update-dialog.component.css']
})
export class ItemUpdateDialogComponent implements OnInit {

  directions = DIRECTIONS;
  itemForm: FormGroup;
  preview: any = null;
  formData = new FormData();
  Editor = ClassicEditor;
  constructor(
    private _dashboardService: DashboardService,
    private _dialogRef: MatDialogRef<ItemUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.itemForm  = this._formBuilder.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(20)]],
      image: [this.data.image, [Validators.required]],
      content: [this.data.content, [Validators.required, contentImageValidator()]],
      _method: ['put']
    });
  }

  onSubmit() {
    this.formData.append('name', this.itemForm.value.name);
    this.formData.append('content', this.itemForm.value.content);
    this.formData.append('_method', 'put');
    this._dashboardService.updateActivationItem(this.formData, this.data.id)
    .subscribe(res => {
      this.formData = null;
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Thông báo', content: 'Cập nhật thành công'}
      });
      this._dialogRef.close(res);
    }, err => {
      console.log(err)
      this._matDialog.open(MessageDialogComponent, {
        data: {title: 'Lỗi', content: err.error.error}
      });
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
