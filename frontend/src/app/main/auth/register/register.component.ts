import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService, UserService} from "../../../core/services";
import * as moment from "moment";
import {AlertDialogComponent} from "../../../core/layouts";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  currentYear: string;
  checkLogin: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _matDialog: MatDialog,
              private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getAllUser();
    this.formRegister = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50), this.usernameInputValidate]],
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email, this.emailInputValidate]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9 \_\-]+$')]],
    });
    this.currentYear = moment().format('YYYY');
    this.checkLogin = localStorage.getItem('currentUser');
  }

  submit(): void {
    this.blockUI.start();
    const nameRequest = this.formRegister.get('name')?.value;
    const emailRequest = this.formRegister.get('email')?.value;
    const passwordRequest = this.formRegister.get('password')?.value;
    const formData = new FormData();
    formData.append('name', nameRequest.trim());
    formData.append('email', emailRequest.trim());
    formData.append('password', passwordRequest.trim());
    this._authService.register(formData).subscribe(
      (data: any) => {
        this._router.navigate(['/chat']);
        this.blockUI.stop();
        localStorage.setItem("currentUser", JSON.stringify(data));
      },
      (error: any) => {
        this.blockUI.stop();
      }
    );
  }

  getAllUser(): void {
    this._userService.getUsers().subscribe(
      res => {
        this.setLocalStorageUser(res);
      },
      error => {
        this._matDialog.open(AlertDialogComponent).componentInstance.message = error.error.error;
      });
  }

  setLocalStorageUser(listUser: any) {
    const listUsername: any[] = [];
    const listEmailUser: any[] = [];
    for (const user of listUser) {
      listUsername.push(user.name);
      listEmailUser.push(user.email);
    }
    localStorage.setItem('listUsername', listUsername.toString());
    localStorage.setItem('listEmailUser', listEmailUser.toString());
  }

  usernameInputValidate(control: AbstractControl) {
    var validate = false;
    const listUsername = localStorage.getItem("listUsername") ? localStorage.getItem("listUsername").split(',') : [];
    if (control.value === "" || control.value == null) {
      return null;
    }
    if (listUsername.length !== 0) {
      if (listUsername.indexOf(control.value.trim()) === -1) {
        validate = true;
      }

      if (validate === true) {
        return null;
      }

      return {'uniqueUsername': true};

    } else {
      return null;
    }
  }

  emailInputValidate(control: AbstractControl) {
    var validate = false;
    const listEmail = localStorage.getItem("listEmailUser") ? localStorage.getItem("listEmailUser").split(',') : [];
    if (control.value === "" || control.value == null) {
      return null;
    }
    if (listEmail.length !== 0) {
      if (listEmail.indexOf(control.value.trim()) === -1) {
        validate = true;
      }
      console.log(control.value.trim());

      if (validate === true) {
        return null;
      }

      return {'uniqueEmail': true};

    } else {
      return null;
    }
  }
}
