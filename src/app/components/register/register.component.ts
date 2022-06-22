import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.registerUser();
  }
  // CREATE USER
  registerUser() {
    this.registerForm = this.fb.group({
      username: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      password2: [''],
      addDynamicElement: this.fb.array([]),
    });
  }
  // SUBMIT FORM
  submitForm() {
    this.userService.registerUser(this.registerForm.value).subscribe((data) => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }
}
