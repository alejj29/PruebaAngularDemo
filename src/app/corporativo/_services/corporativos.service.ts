import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Corporativo } from '../_models/corporativo';
import { CorporativoDetalle, CorporativoEdit } from '../_models/corporativoDetalle';

@Injectable({
  providedIn: 'root'
})
export class CorporativosService {
  apiCorporativosURL = environment.apiURL;
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
    return this.http.get<Corporativo[]>(this.apiCorporativosURL + '/corporativos', headers);
  }

  getByIdCorporativo(id: number): Observable<CorporativoDetalle> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_toke}`
      })
    }
    return this.http.get<CorporativoDetalle>(this.apiCorporativosURL + '/corporativos/' + id, headers);
  }
  updateCorporativo(idCorporativo: number, corporativo: CorporativoEdit): Observable<CorporativoEdit> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_toke}`
      })
    }
    return this.http.put<CorporativoEdit>(this.apiCorporativosURL + '/corporativos/' + idCorporativo, corporativo, headers);
  }

}
