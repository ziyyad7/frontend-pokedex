import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { PageData } from '../models/pageData.model';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConnexionService } from '../../connexion/connexion.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl : string = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  constructor(private httpClient: HttpClient, private connexionService: ConnexionService) { }

  getPokemons(params:any): Observable<PageData<Pokemon>>{
    return this.httpClient.get<PageData<Pokemon>>(this.pokemonUrl + "/pokemons?offset="+encodeURIComponent(params.offset)+"&limit="+encodeURIComponent(params.limit)).pipe(
      tap(x=>console.log("Fetched pokemons")),
      catchError(this.handleError<PageData<Pokemon>>('getPokemons'))
      );
  }

  getPokemonsSearch(params:any, recherche?:string): Observable<PageData<Pokemon>>{
    return this.httpClient.get<PageData<Pokemon>>(this.pokemonUrl + "/pokemons?search="+ recherche +"&offset="+encodeURIComponent(params.offset)+"&limit="+encodeURIComponent(params.limit)).pipe(
      tap(x=>console.log("Fetched pokemons")),
      catchError(this.handleError<PageData<Pokemon>>('getPokemons'))
      );
  }


  getPokemonDetails(id: number): Observable<Pokemon>{
    return this.httpClient.get<Pokemon>(this.pokemonUrl + "/pokemons/"+id).pipe(
      tap(x=>console.log("Fetched pokemons")),
      catchError(this.handleError<Pokemon>('getPokemons'))
      );
  }

  getPokemonsEquipe(): Observable<any>{
    let header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${this.connexionService.access_token}`)
    }
    const url = this.pokemonUrl+"/trainers/me/team";
    return this.httpClient.get<any>(url, header);
  }

  putPokemonsEquipe(tabEquipe : []): Observable<any>{
    let header = {
      headers: new HttpHeaders().set('Authorization',  `Bearer ${this.connexionService.access_token}`)
    }
    const url = this.pokemonUrl+"/trainers/me/team";
    return this.httpClient.put<any>(url, tabEquipe, header);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
