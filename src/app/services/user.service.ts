import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }
  deleteUser(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
  getUsersByStatus(role: string) {
    return this.http.get<any>(`${environment.apiUrl}/users?role=${role}`);
  }
  createUsers(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/users`, { ...user });
  }
}
