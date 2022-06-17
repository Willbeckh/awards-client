import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.onSubmit();
  }

  // upload image on button click
  onSubmit() {}

  uploadFile(event) {}
}
