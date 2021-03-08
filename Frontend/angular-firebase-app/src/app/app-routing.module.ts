import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { ExchangeRatesComponent } from './pages/exchange-rates/exchange-rates.component';
import { SongsComponent } from './pages/songs/songs.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
  },
  {
    path: 'exchange-rate',
    component: ExchangeRatesComponent,
  },
  {
    path: 'songs',
    component: SongsComponent,
  },
  {
    path: 'add-song',
    component: AddSongComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
