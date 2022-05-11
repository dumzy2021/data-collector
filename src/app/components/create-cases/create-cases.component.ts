import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CasesService } from 'src/app/services/cases.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-cases',
  templateUrl: './create-cases.component.html',
  styleUrls: ['./create-cases.component.scss'],
})
export class CreateCasesComponent implements OnInit {
  user: any;
  loading: boolean = false;
  caseForm!: FormGroup;
  roles: string[] = ['CSO', 'SUPERVISOR', 'ADMIN'];
  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private router: Router,
    private caseService: CasesService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }
  get title() {
    return this.caseForm.get('title');
  }
  get description() {
    return this.caseForm.get('description');
  }

  // {
  //   "userID": 1000,
  //   "id": 121,
  //   "createdBy": "Dave crane",
  //   "title": "Hello Everyonne, please to meet you",
  //   "description": "etur, adipisicing elit. Excepturi impedit animi mollitia? Exercitationem accusantium rerum facere aspernatur incidunt hic obcaecati vel architecto ratione culpa aperiam commodi adipisci, asperiores, porro fuga.",
  //   "status": 1,
  //   "approvedBy": "ADMIN",
  //   "createdAt": ""
  // },
  ngOnInit(): void {
    this.caseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  createUser() {
    if (this.caseForm.invalid) {
      Object.keys(this.caseForm.controls).forEach((key) => {
        this.caseForm.controls[key].markAsDirty();
        this.caseForm.controls[key].updateValueAndValidity();
      });
      return;
    }
    // this.loading = true;
    let newCase = {
      ...this.caseForm.value,
      userID: this.user.id,
      createdBy: this.user.firstname + ' ' + this.user.lastname,
      status: 0,
      approvedBy: '',
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * (10000000 - 20 + 1)) + 20,
    };
    this.caseService.createCase(newCase).subscribe({
      next: (data) => {
        console.log(data);
        this.notify.showSuceess('Case Created Successfully');
        setTimeout(() => {
          this.router.navigate(['/my-cases']);
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
