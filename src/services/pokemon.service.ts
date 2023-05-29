import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';
import { Pokemon, PokemonListResponse } from 'src/models/PokemonApi';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private isBrowser: boolean;
  private cache: Record<string, any> = {
    'http://google.es': { data: 'Hola' },
  };
  private CACHE_KEY = makeStateKey<Record<string, any>>('pokemon');

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
      return cached;
    } else {
      // Si la respuesta no está en caché, hacemos la solicitud HTTP y guardamos la respuesta en caché
      return this.http
        .get<PokemonListResponse>(apiUrl)
        .pipe(tap((response) => this.saveRequestOnCache(apiUrl, response)));
    }
  }

  public getPokemonInfo(pokemonUrl: string): Observable<Pokemon> {
    const cached = this.getRequestFromCache(pokemonUrl);
    if (cached) {
      return cached;
    } else {
      // Si la respuesta no está en caché, hacemos la solicitud HTTP y guardamos la respuesta en caché
      return this.http
        .get<Pokemon>(pokemonUrl)
        .pipe(tap((response) => this.saveRequestOnCache(pokemonUrl, response)));
    }
  }

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
}
