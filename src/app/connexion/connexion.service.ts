import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  public access_token: string = '';

  public refresh_token: string = '';

  public expires_in : number = 0;

  private debuURI : String = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  public POSTauthlogin(TABDATA : any): Observable<any>{

    let uri = this.debuURI + '/auth/login';
    let body = TABDATA;

    return this.http.post<any>(uri, body);
  }
  public POSTtrainers(TABDATA : any): Observable<any>{

    let uri = this.debuURI + '/trainers';
    let body = TABDATA;

    return this.http.post<any>(uri, body);
  }

  public POSTauthrefresh(TABDATA : any): Observable<any>{

    let uri = this.debuURI + '/auth/refresh';
    let body = TABDATA;

    return this.http.post<any>(uri, body);
  }

  public reset(){
    this.access_token = '';
    this.refresh_token = '';
    this.expires_in = 0;
  }

  public refreshToken() {

    if (localStorage.getItem('refresh_token')) {

      let dataForApi : any = {
        refresh_token : localStorage.getItem('refresh_token')
      }

      this.POSTauthrefresh(dataForApi).subscribe((data: any) => {

        if (data.access_token) {
          this.access_token = data.access_token;
          this.refresh_token = data.refresh_token;
          this.expires_in = data.expires_in;
        }
      }, error => {
        this.deconnexion();
      })
    }
  }

  public deconnexion(){
    if (localStorage.getItem('refresh_token')) {
      localStorage.removeItem('refresh_token');
      this.reset();
      this.router.navigate(['.']);
      this.snackBar.open("Vous avez été déconnecté", "Fermer", {duration: 5000});
    }
  }
}
