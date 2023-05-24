import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from 'src/components/PokemonList/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonItemComponent } from 'src/components/PokemonItem/pokemon-item.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { PokemonDetal } from 'src/components/PokemonDetail/pokemon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:2000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
