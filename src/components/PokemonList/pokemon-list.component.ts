import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonInList } from 'src/models/PokemonApi';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  public pokemons: PokemonInList[] = [];
  public errorMessage: string = '';

  private readonly pageSize: number = 10;
  private offset: number = 0;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    this.loadPokemons();
  }

  private loadPokemons() {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.pageSize}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        console.log(response);
        this.pokemons = [...this.pokemons, ...response.results]
      },
      error: (e) => {
        this.errorMessage = 'Error retrieving Pokémon data.';
        console.error(e);
      },
      complete: () => console.info('complete')
    });
  }

  public nextPage() {
    this.offset += this.pageSize;
    this.loadPokemons();
  }

  public reload() {
    window.location.reload()
  }
}