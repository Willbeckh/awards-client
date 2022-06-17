import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userform: FormGroup;
  usersArr: any = [];

  constructor(
    // public fb: FormBuilder,
    public zone: NgZone,
    public userService: UserService,
    private http: HttpClient
  ) {}

  obj: any;

  ngOnInit(): void {
    this.obj = this.getProjects();
  }
  // get all users,
  getProjects() {
    this.userService.getUsers().subscribe((data) => {
      this.obj = data;
    });
  }
}
