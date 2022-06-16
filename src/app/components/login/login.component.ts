import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // userArray: any = [];

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.loginUser();
  }

  // login user
  loginUser() {
    this.loginForm = this.fb.group({
      // form input for username + password
      username: [''],
      password: [''],
    });
  }
  submitForm() {
    this.userService.loginUser(this.loginForm.value).subscribe((data) => {
      this.ngZone.run(() => this.router.navigateByUrl('/'));
    });
  }
}
