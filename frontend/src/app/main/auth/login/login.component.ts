import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {AuthService} from "../../../core/services";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {AlertDialogComponent} from "../../../core/layouts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  currentYear: string;
  checkLogin: any;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _matDialog: MatDialog,
              private _formBuilder: FormBuilder,
              private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9 \_\-]+$')]]
    });
    this.currentYear = moment().format('YYYY');
    this.checkLogin = localStorage.getItem('currentUser');
  }

  submit(): void {
    this.blockUI.start();
    let emailRequest = this.formLogin.get('email')?.value;
    let passwordRequest = this.formLogin.get('password')?.value;
    const formData = new FormData();
    formData.append('email', emailRequest.trim());
    formData.append('password', passwordRequest.trim());
    this._authService.login(formData).subscribe(
      (data: any) => {
        this._router.navigate(['/chat']);
        this.blockUI.stop();
        localStorage.setItem("currentUser", JSON.stringify(data));
      },
      (error: any) => {
        this.blockUI.stop();
        this._matDialog.open(AlertDialogComponent).componentInstance.message = error.error.error;
      }
    );
  }
}
