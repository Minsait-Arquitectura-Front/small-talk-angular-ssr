import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonInList } from "../../models/PokemonApi";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon?: PokemonInList;

  public pokemonData$?: Observable<Pokemon>;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    if (this.pokemon?.url) {
      this.pokemonData$ = this.http.get<Pokemon>(this.pokemon.url);
    }
  }
}