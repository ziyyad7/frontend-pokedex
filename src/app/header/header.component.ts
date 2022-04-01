import { Component, OnInit } from '@angular/core';
import { ConnexionService} from "../connexion/connexion.service";
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public activeRoute: String = '';

  constructor(private connexionService: ConnexionService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
    this.connexionService.refreshToken();
  }

  public isConnected(){
    return (localStorage.getItem('refresh_token'))
  }

  public deconnexion(){
    this.connexionService.deconnexion();
  }

}
