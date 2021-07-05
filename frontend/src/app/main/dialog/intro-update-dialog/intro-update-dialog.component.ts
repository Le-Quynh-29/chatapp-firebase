import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { contentImageValidator } from '../../../core/utils/utils';

@Component({
  selector: 'app-intro-update-dialog',
  templateUrl: './intro-update-dialog.component.html',
  styleUrls: ['./intro-update-dialog.component.css']
})
export class IntroUpdateDialogComponent implements OnInit {

  introForm: FormGroup;
  preview: any = null;
  formData = new FormData();
  Editor = ClassicEditor;
  constructor(
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _dialogRef: MatDialogRef<IntroUpdateDialogComponent>,
    private _dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.introForm = this._formBuilder.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(50)]],
      year: [this.data.year, [Validators.required]],
      image: [this.data.image, [Validators.required]],
      content: [this.data.content, [Validators.required, contentImageValidator()]],
      _method: ['put']
    });
  }

  onSave() {
    this.formData.set('title', this.introForm.value.title);
    this.formData.set('year', this.introForm.value.year);
    this.formData.set('content', this.introForm.value.content);
    this.formData.set('_method', 'put');
    this._dashboardService.updateIntroduction(this.formData).subscribe(res => {
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

  onFileChange(e) {
    const avatar = e.target.files[0];
    this.formData.set('image', avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }
}
