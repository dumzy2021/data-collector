import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CasesService } from 'src/app/services/cases.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.scss'],
})
export class MyCasesComponent implements OnInit {
  page: number = 1;
  tableSize: number = 3;
  tableSizes: number[] = [3, 6, 9, 12];
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
    this.getMyCases();
    this.filterForm = this.fb.group({
      status: [this.allStatus.length - 1],
    });
  }
  onTableSizeChange(e: any) {
    this.tableSize = +e.target.value;
  }
  getMyCases() {
    this.caseService.getMyCases(this.user.id).subscribe({
      next: (data) => {
        this.cases = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterCaseByStatus() {
    if (this.filterForm.value.status === 3) {
      this.getMyCases();
      return;
    }
    this.caseService
      .getMyCasesById(this.user.id, this.filterForm.value.status)
      .subscribe({
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
