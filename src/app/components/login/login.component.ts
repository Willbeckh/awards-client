import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    // this.loginUser();
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  submitForm() {
    this.userService
      .loginUser(this.f['username'].value, this.f['password'].value)
      .subscribe((data) => {
        this.ngZone.run(() =>
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          })
        );
      });
  }
}
