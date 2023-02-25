import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as interfaces from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = `${environment.baseUrl}/api`; // cambiar en el server // hacer archivo env
  private _auth: interfaces.Auth | undefined;

  constructor(private httpUsers: HttpClient) { }


  login(user: interfaces.UserLogin) {

    return this.httpUsers.post<interfaces.Auth>(this.authUrl + '/login', user)
      .pipe(tap(auth => this._auth = auth));
  }


  registro(user: interfaces.UserRegsitro) {

    return this.httpUsers.post<interfaces.registroResponse>(this.authUrl + '/register', user);
  }


  solicitarRecPasswd(email: string) {

    return this.httpUsers.post<interfaces.solicitarRecPasswdResponse>(this.authUrl
      + '/solicitarrecpasswd', { email: email });
  }


  recuperarPasswd(id: string, cod: string) {
    return this.httpUsers.post<interfaces.recPasswdResponse>(this.authUrl
      + '/recuperarpasswd/' + id, { cod: cod });
  }


  puedeModificar(): Observable<boolean> {

    const user = localStorage.getItem('user');

    if (!user) {
      return of(false);

    } else {
      return this.httpUsers.get<interfaces.Auth>(`${this.authUrl}/puedeModificar/${JSON.parse(user).id}`)
        .pipe(
          map(auth => {
            if (auth.success) {

              this._auth = auth;
              return true;

            } else {
              return false;
            }
          })
        );
    }
  }
}
