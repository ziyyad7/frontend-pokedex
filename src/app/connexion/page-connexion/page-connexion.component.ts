import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {ConnexionService} from "../connexion.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-connexion',
  templateUrl: './page-connexion.component.html',
  styleUrls: ['./page-connexion.component.scss']
})
export class PageConnexionComponent {

  public connexion : any = {
      email : null,
      password : null
  }

  public hide : boolean = true;

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userConnexionService: ConnexionService, private router: Router, private snackBar: MatSnackBar) {
    if (localStorage.getItem('refresh_token')) this.router.navigate(['/']);
  }

  public postAuthLogin(){
    this.userConnexionService.POSTauthlogin(this.connexion).subscribe((data:any)=> {

      if(data.access_token){
        this.userConnexionService.access_token = data.access_token;
        this.userConnexionService.refresh_token = data.refresh_token;
        this.userConnexionService.expires_in = data.expires_in;

        localStorage.setItem('refresh_token', this.userConnexionService.refresh_token);
        this.router.navigate(['/']);
      }

    }, error => {
      this.snackBar.open("Erreur de connexion", "Fermer", {duration: 5000});
    })
  }

}
