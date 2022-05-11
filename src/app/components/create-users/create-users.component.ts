import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
})
export class CreateUsersComponent implements OnInit {
  loading: boolean = false;
  userForm!: FormGroup;
  roles: string[] = ['CSO', 'SUPERVISOR', 'ADMIN'];
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private router: Router,
    private userService: UserService
  ) {}
  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }

  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.roles[0]],
    });
  }
  createUser() {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.controls[key].markAsDirty();
        this.userForm.controls[key].updateValueAndValidity();
      });
      return;
    }
    this.loading = true;
    let userDetails = {
      ...this.userForm.value,
      id: Math.floor(Math.random() * (10000000 - 20 + 1)) + 20,
    };
    this.userService.createUsers(userDetails).subscribe({
      next: (data) => {
        this.notify.showSuceess('User Created Successfully');
        setTimeout(() => {
          this.router.navigate(['/users']);
          this.loading = false;
        }, 2500);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }
}
