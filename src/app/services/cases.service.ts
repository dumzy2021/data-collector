import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private http: HttpClient) {}

  getAllCases() {
    return this.http.get<any>(`${environment.apiUrl}/cases`);
  }
  deleteCase(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/cases/${id}`);
  }
  approveOrRejectCases(id: number, decision: any) {
    return this.http.patch<any>(`${environment.apiUrl}/cases/${id}`, {
      ...decision,
    });
  }
  getCasesByStatus(status: number) {
    return this.http.get<any>(`${environment.apiUrl}/cases?status=${status}`);
  }
  createCase(cases: any) {
    return this.http.post<any>(`${environment.apiUrl}/cases`, { ...cases });
  }
  getMyCases(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/cases?userID=${id}`);
  }
  getMyCasesById(id: number, status: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/cases?userID=${id}&status=${status}`
    );
  }
}
