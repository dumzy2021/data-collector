import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  page: number = 1;
  tableSize: number = 3;
  tableSizes: number[] = [3, 6, 9, 12];
  users: any;
  allRoles: string[] = ['ALL', 'CSO', 'ADMIN', 'SUPERVISOR'];
  filterForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUsers();
    this.filterForm = this.fb.group({
      role: [this.allRoles[0]],
    });
  }
  onTableSizeChange(e: any) {
    this.tableSize = +e.target.value;
  }
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user: any) => user.id !== id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onFilter() {
    if (this.filterForm.value.role === 'ALL') {
      this.getUsers();
      return;
    }
    this.userService.getUsersByStatus(this.filterForm.value.role).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {},
    });
  }
}
