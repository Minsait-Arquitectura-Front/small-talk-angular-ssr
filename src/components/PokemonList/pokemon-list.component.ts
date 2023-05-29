import { Component, OnInit } from '@angular/core';
import { PokemonInList } from 'src/models/PokemonApi';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  public pokemons: PokemonInList[] = [];
  public errorMessage = '';

  private readonly pageSize: number = 10;
  private offset = 0;

  constructor(private pokemonService: PokemonService) {}

  public ngOnInit() {
    this.loadPokemons();
  }

  private loadPokemons() {
    this.pokemonService.getPokemons(this.offset, this.pageSize).subscribe({
      next: (response) => {
        this.pokemons = [...this.pokemons, ...response.results];
      },
      error: (e) => {
        this.errorMessage = 'Error retrieving Pokémon data.';
        console.error(e);
      },
    });
  }

  public nextPage() {
    this.offset += this.pageSize;
    this.loadPokemons();
  }

  public reload() {
    window.location.reload();
  }
}
