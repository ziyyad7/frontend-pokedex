import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {ConnexionService} from "../../connexion/connexion.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-gestion-equipe',
    templateUrl: './gestion-equipe.component.html',
    styleUrls: ['./gestion-equipe.component.scss']
})
export class GestionEquipeComponent implements OnInit {

    public tabIdEquipe : [] = [];
    public ajouter:boolean = false;

    constructor(private pokemonService: PokemonService, private connexionService: ConnexionService, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.getPokemonsList();
    }

    getPokemonsList(){
        this.pokemonService.getPokemonsEquipe().subscribe(
            (resultGetPokemonEquipe: []) => {
                this.tabIdEquipe = resultGetPokemonEquipe;
            }, error => {
                this.connexionService.refreshToken();
                this.getPokemonsList();
            });
    }

    putPokemonsList(){
        this.pokemonService.putPokemonsEquipe(this.tabIdEquipe).subscribe(
            () => {
                this.getPokemonsList()
            }, error => {
                this.connexionService.refreshToken();
                this.putPokemonsList();
            });
    }

    deletePokemon(index: any){
        this.tabIdEquipe.splice(index, 1);
        this.putPokemonsList();
    }

    ajoutPokemon(value: any){
        if(this.tabIdEquipe.length < 6) {
            // @ts-ignore
            this.tabIdEquipe.push(value);
            this.putPokemonsList();
        }
        else{
            this.snackBar.open("Votre équipe ne peut pas contenir plus de 6 pokemon", "Fermer", {duration: 5000})
        }
    }

}
