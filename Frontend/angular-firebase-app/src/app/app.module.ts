import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeRatesComponent } from './pages/exchange-rates/exchange-rates.component';
import { SongsComponent } from './pages/songs/songs.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { SongListComponent } from './pages/songs/components/song-list/song-list.component';
import { SongActionButtonComponent } from './pages/songs/components/song-action-button/song-action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    SongsComponent,
    AddSongComponent,
    SongListComponent,
    SongActionButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
