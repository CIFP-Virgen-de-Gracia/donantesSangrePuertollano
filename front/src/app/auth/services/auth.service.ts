import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = 'http://localhost/api/'; // cambiar en el server // hacer archivo env
  private _auth: Auth | undefined;

  constructor(private httpUsers: HttpClient) {}

  login (user: UserLogin) {

    return this.httpUsers.post<Auth>(this.authUrl + '/login', user)
      .pipe(tap(auth => this._auth = auth));
  }
}
