import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";

const BASE_URI = './api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  get(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${BASE_URI}/${userId}`);
  }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(BASE_URI);
  }

  save(user: User): Observable<User> {
    if (user.userId) {
      return this.httpClient.put<User>(`${BASE_URI}/${user.userId}`, user);
    }
    return this.httpClient.post<User>(BASE_URI, user);
  }

  delete(userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${BASE_URI}/${userId}`);
  }
}
