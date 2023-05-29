import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonListResponse } from "src/models/PokemonApi";

@Injectable({
 providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  public getPokemons(offset: number = 0, pageSize: number = 10): Observable<PokemonListResponse> {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`;

    return this.http.get<any>(apiUrl);
  }
}
