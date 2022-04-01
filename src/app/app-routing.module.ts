import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import {PageConnexionComponent} from "./connexion/page-connexion/page-connexion.component";
import {GestionEquipeComponent} from "./pokemons/gestion-equipe/gestion-equipe.component";

const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  {path: 'pokedex', component: PokedexComponent},
  {path: 'connexion', component: PageConnexionComponent},
  {path: 'mon-equipe', component: GestionEquipeComponent},
  { path: '**', redirectTo: '/pokedex', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
