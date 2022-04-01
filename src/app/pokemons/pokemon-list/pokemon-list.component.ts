import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { PageData } from '../models/pageData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Output() eventPokemonSelect = new EventEmitter<number>();

  pokemons ?: PageData<Pokemon>={
    data:[],
    limit:1,
    offset:0
  };
  paramsForAPI:any={
    offset:0,
    limit:20
  }

  recherche ?: string;

  emitEventPokemonSelect(value:number){
    this.eventPokemonSelect.emit(value);
  }

  resetOffset():void{
    this.paramsForAPI.offset=0;
    if(this.pokemons)
        this.pokemons.data=[];
    this.getPokemon();
  }

  getPokemon():void{

    if(this.recherche){

      this.getPokemonSearch();
    }
    else{
      this.getPokemonList();
    }

    console.log(this.recherche);
  }

  getPokemonList():void{

    this.pokemonService.getPokemons(this.paramsForAPI).subscribe(apokemons => {

      this.paramsForAPI.offset+=this.paramsForAPI.limit;
      apokemons.data.forEach(el => {
      this.pokemons?.data.push(el)
      });
    }
    );
  }

  getPokemonSearch():void{

    this.pokemonService.getPokemonsSearch(this.paramsForAPI, this.recherche).subscribe(apokemons => {

      this.paramsForAPI.offset+=this.paramsForAPI.limit;
      apokemons.data.forEach(el => {

      this.pokemons?.data.push(el)
      });
    }
    );
  }


  playAudio(id:number){
    let audio = new Audio();
    audio.src = "../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

  onScroll(): void{
    console.log("Scroll down");
    this.getPokemon();

  }

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

}
