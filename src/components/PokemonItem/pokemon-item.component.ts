import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokemonInList } from '../PokemonList/pokemon-list.component';

interface PokemonData {
  name: string;
  imageUrl: string;
  mainInfo: string;
}

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon?: PokemonInList;

  public pokemonData?: PokemonData;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    if (this.pokemon?.url) {
      this.http.get<any>(this.pokemon.url)
        .subscribe(pokemonData => {
          this.pokemonData = {
            name: pokemonData.name,
            imageUrl: pokemonData.sprites.front_default,
            mainInfo: `Height: ${pokemonData.height}, Weight: ${pokemonData.weight}`
          };
        });
    }

  }
}