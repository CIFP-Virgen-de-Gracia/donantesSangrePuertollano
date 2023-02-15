import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  updateConfigHermandad(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/updateConfigHermandad`);
  }
}
