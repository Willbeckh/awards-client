import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  logout() {
    this.userService.logoutUser();
    location.reload();
  }
}
