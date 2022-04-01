import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  @Input() id : any = 3;

  pokemon ?: Pokemon;

  getPokemon(){
    this.pokemonService.getPokemonDetails(this.id).subscribe(pokemon => this.pokemon=pokemon);
  }

  playAudio(id:number){
    let audio = new Audio();
    audio.src = "../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

  goBack(){
    this.location.back();
  }

  constructor(private pokemonService: PokemonService, private route : ActivatedRoute, public location : Location) { }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    this.getPokemon();
  }


}
