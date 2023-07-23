import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.interface'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://lawrichfreight.com/moolre/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+'/get_users.php');
  }

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get_user.php?id=${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'/add_user.php', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'/update_user.php', user);
  }

  deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete_user.php?id=${userId}`);
}

}