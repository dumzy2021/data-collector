import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CasesService } from 'src/app/services/cases.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-cases',
  templateUrl: './user-cases.component.html',
  styleUrls: ['./user-cases.component.scss'],
})
export class UserCasesComponent implements OnInit {
  user: any;
  cases: any = [];
  filterForm!: FormGroup;
  allStatus: string[] = ['PENDING', 'APPROVED', 'REVOKED', 'ALL'];
  constructor(
    private caseService: CasesService,
    private utilService: UtilsService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {
    this.getUsersCases();
    this.filterForm = this.fb.group({
      status: [this.allStatus.length - 1],
    });
  }
  getUsersCases() {
    this.caseService.getAllCases().subscribe({
      next: (data) => {
        console.log(data);
        this.cases = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  caseDecision(caseID: number, decision: number) {
    let payload = {
      status: decision,
      approvedBy: this.user?.role,
    };
    this.caseService.approveOrRejectCases(caseID, payload).subscribe({
      next: (data: any) => {
        this.cases = this.cases.map((c: any) => {
          if (c.id === caseID) {
            return {
              ...c,
              status: decision,
              approvedBy: this.user?.role,
            };
          }
          return c;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  filterCaseByStatus() {
    if (this.filterForm.value.status === 3) {
      this.getUsersCases();
      return;
    }
    this.caseService.getCasesByStatus(this.filterForm.value.status).subscribe({
      next: (data) => {
        this.cases = data;
      },
      error: (error) => {},
    });
  }
  getStatus(status: number) {
    return this.utilService.getStatus(status);
  }
}
