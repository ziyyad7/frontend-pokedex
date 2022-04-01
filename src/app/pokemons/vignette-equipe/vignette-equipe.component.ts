import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/pokemon.model";

@Component({
  selector: 'app-vignette-equipe',
  templateUrl: './vignette-equipe.component.html',
  styleUrls: ['./vignette-equipe.component.scss']
})
export class VignetteEquipeComponent implements OnInit, OnChanges {

  @Input() idPokemon: number = 0;

  @Output() clickIdEventEmitter = new EventEmitter<string>();

  public pokemonInfos?: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
   this.getInfo();
  }

  getInfo(){
    this.pokemonService.getPokemonDetails(this.idPokemon).subscribe((pokemonInfosRecup: Pokemon) => this.pokemonInfos = pokemonInfosRecup);
  }

  emitClickIdEventEmitter(value: any){
    this.clickIdEventEmitter.emit(value);
  }

}
