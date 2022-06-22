import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
  selectedFile: File;
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public projectService: ProjectService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get f() {
    return this.projectForm.controls;
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      author: 1,
      name: [''],
      description: [''],
      image_file: [''],
      url: [''],
    });
    console.log(this.projectForm.value.image_file);
  }

  onUploadFile(event: any) {
    // const reader = new FileReader/();
    this.selectedFile = event.target.files[0].name;
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectForm.value.image_file = this.selectedFile;
    console.log(this.projectForm.value.image_file);

    this.projectService
      .createProject(this.projectForm.value)
      .subscribe((data) => {
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      });
  }
}
