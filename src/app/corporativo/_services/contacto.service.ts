import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Contacto } from '../_models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  apiCorporativosURL = environment.apiURL;
  options: any;

  public auth_toke = localStorage.getItem('tokenscloud')


  constructor(private http: HttpClient) {

  }
  createContact(contacto: Contacto): Observable<Contacto> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_toke}`
      })
    }
    return this.http.post<Contacto>(this.apiCorporativosURL + '/contactos', contacto, headers);
  }
  deleteContact(idContacto: number): Observable<Contacto> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_toke}`
      })
    }
    return this.http.delete<Contacto>(this.apiCorporativosURL + '/contactos/' + idContacto, headers);
  }

}
