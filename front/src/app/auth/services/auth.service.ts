import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin, Auth, UserRegsitro, registroResponse } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = 'http://localhost:8090/api/'; // cambiar en el server // hacer archivo env
  private _auth: Auth | undefined;

  constructor(private httpUsers: HttpClient) {}

  login (user: UserLogin) {

    return this.httpUsers.post<Auth>(this.authUrl + '/login', user)
      .pipe(tap(auth => this._auth = auth));
  }

  registro (user: UserRegsitro) {

    return this.httpUsers.post<registroResponse>(this.authUrl + '/register', user);
  }
}
