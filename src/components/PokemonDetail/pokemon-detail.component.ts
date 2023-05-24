import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/models/PokemonApi';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetal implements OnInit {
  public pokemonId?: number;
  public pokemon$?: Observable<Pokemon>;
  public pokemonUrl?: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.pokemon$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.pokemonId = Number(params.get('id'));
        this.pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`
        return this.http.get<Pokemon>(this.pokemonUrl);
      })
    );
  }
}