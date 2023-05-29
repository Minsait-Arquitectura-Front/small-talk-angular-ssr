import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Pokemon,
  PokemonInList,
  PokemonListResponse,
} from 'src/models/PokemonApi';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private isBrowser: boolean;
  private cache: Record<string, any> = {
    'http://google.es': { data: 'Hola' },
  };
  private CACHE_KEY = makeStateKey<Record<string, any>>('pokemon');
  private FAVORITE_KEY = 'favorite_pokemons';

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.cache = this.transferState.get(this.CACHE_KEY, this.cache);
      console.log('Cache from server:');
      console.log(this.cache);
    }
  }

  public getPokemons(
    offset = 0,
    pageSize = 10
  ): Observable<PokemonListResponse> {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`;

    const cached = this.getRequestFromCache(apiUrl);
    if (cached) {
      return cached.pipe(map(this.addIsFavoriteProperty));
    } else {
      // Si la respuesta no está en caché, hacemos la solicitud HTTP y guardamos la respuesta en caché
      return this.http.get<PokemonListResponse>(apiUrl).pipe(
        map(this.addIsFavoriteProperty),
        tap((response) => this.saveRequestOnCache(apiUrl, response))
      );
    }
  }

  public getPokemonInfo(pokemonUrl: string): Observable<Pokemon> {
    const cached = this.getRequestFromCache(pokemonUrl);
    if (cached) {
      return cached.pipe(
        map((poke) => this.addIsFavoritePropertyToPokemon(poke) as Pokemon)
      );
    } else {
      // Si la respuesta no está en caché, hacemos la solicitud HTTP y guardamos la respuesta en caché
      return this.http.get<Pokemon>(pokemonUrl).pipe(
        map((poke) => this.addIsFavoritePropertyToPokemon(poke) as Pokemon),
        tap((response) => this.saveRequestOnCache(pokemonUrl, response))
      );
    }
  }

  public markAsFavorite(pokemon: Pokemon): void {
    if (this.isBrowser) {
      const favorites = this.getFavorites();
      favorites[pokemon.name] = pokemon;
      localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favorites));
    }
  }

  public isFavorite(pokemon: Pokemon | PokemonInList): boolean {
    const favorites = this.getFavorites();
    return !!favorites[pokemon.name];
  }

  private getFavorites(): Record<string, Pokemon> {
    if (this.isBrowser) {
      const favorites = localStorage.getItem(this.FAVORITE_KEY);
      return favorites ? JSON.parse(favorites) : {};
    }
    return {};
  }

  private addIsFavoriteProperty = (
    response: PokemonListResponse
  ): PokemonListResponse => {
    response.results.forEach((poke: PokemonInList) =>
      this.addIsFavoritePropertyToPokemon(poke)
    );
    return response;
  };

  public saveRequestOnCache(apiUrl: string, response: any) {
    this.cache[apiUrl] = response;
    console.log(`Saved request ${apiUrl}`);

    if (!this.isBrowser) {
      this.transferState.set(this.CACHE_KEY, this.cache);
    }
  }

  public getRequestFromCache(apiUrl: string): Observable<any> | null {
    if (this.cache[apiUrl]) {
      // Si la respuesta ya está en caché, retornamos la respuesta desde la caché
      console.log(`Retrieved from cache request ${apiUrl}`);
      return of(this.cache[apiUrl]);
    }

    return null;
  }

  private addIsFavoritePropertyToPokemon = (
    pokemon: Pokemon | PokemonInList
  ): Pokemon | PokemonInList => {
    pokemon.isFavorite = this.isFavorite(pokemon);
    return pokemon;
  };
}
