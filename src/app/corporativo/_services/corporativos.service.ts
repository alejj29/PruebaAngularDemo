import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Corporativo } from '../_models/corporativo';

@Injectable({
  providedIn: 'root'
})
export class CorporativosService {
  apiCorporativosURL = environment.apiURL + '/corporativos';
  options: any;

  public auth_toke = localStorage.getItem('tokenscloud')


  constructor(private http: HttpClient) {

  }

  getCorporativos(): Observable<Corporativo[]> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_toke}`
      })
    }
    return this.http.get<Corporativo[]>(this.apiCorporativosURL, headers);
  }


}
