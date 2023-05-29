import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonInList } from "../../models/PokemonApi";
import { Observable } from 'rxjs';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon?: PokemonInList;

  public pokemonData$?: Observable<Pokemon>;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  public ngOnInit() {
    if (this.pokemon?.url) {
      this.pokemonData$ = this.pokemonService.getPokemonInfo(this.pokemon?.url);
    }
  }
}