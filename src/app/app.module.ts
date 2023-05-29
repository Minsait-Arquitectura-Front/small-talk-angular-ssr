import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from 'src/components/PokemonList/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonItemComponent } from 'src/components/PokemonItem/pokemon-item.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetal } from 'src/components/PokemonDetail/pokemon-detail.component';
import { PokemonService } from 'src/services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetal,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:2000'
    // }),
  ],
  providers: [
    PokemonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
