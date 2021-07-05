import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemUpdateDialogComponent } from './item-update-dialog/item-update-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../../core/pipes/pipes.module';
import { KhaiSonLapHuongUpdateComponent } from './khai-son-lap-huong-update/khai-son-lap-huong-update.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IntroUpdateDialogComponent } from './intro-update-dialog/intro-update-dialog.component';
import { PrincipleUpdateDialogComponent } from './principle-update-dialog/principle-update-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    ItemUpdateDialogComponent,
    KhaiSonLapHuongUpdateComponent,
    IntroUpdateDialogComponent,
    PrincipleUpdateDialogComponent,
    MessageDialogComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PipesModule,
    CKEditorModule,
    MatSelectModule
  ],
  exports: [
    ItemUpdateDialogComponent
  ]
})
export class DialogModule { }
