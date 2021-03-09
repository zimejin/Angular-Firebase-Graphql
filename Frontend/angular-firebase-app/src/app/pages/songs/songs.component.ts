import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Songs } from 'src/app/types';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SongsServiceGQL } from './songs.service';

@Component({
  selector: 'app-songs',
  template: `
    <div class="container">
      <app-song-list
        [songs]="songs$ | async"
        (delete)="deleteSong($event)"
        (edit)="editSong($event)"
      ></app-song-list>
      <app-song-action-button (add)="addSong()"></app-song-action-button>
    </div>
  `,
  styles: [``],
})
export class SongsComponent implements OnInit, OnDestroy {
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   *
   * Container components are also reusable. Whether or not
   * a component is a presentation component or a container
   * component is an implementation detail.
   */

  songs$!: Observable<Songs[]>;
  loading = true;
  error: any;
  mutationSubscription$!: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private songsService: SongsServiceGQL
  ) {}

  ngOnInit(): void {
    this.songs$ = this.apollo
      .use('expressFirebaseServer')
      .watchQuery({
        query: gql`
          {
            songs {
              title
              artist
              album
              year
              rank
            }
          }
        `,
        pollInterval: 1000,
      })
      .valueChanges.pipe(
        tap((result) => console.log('debug: ', result)),
        map((response: any) => response.data.songs as Songs[])
      );
  }

  ngOnDestroy() {
    this.mutationSubscription$.unsubscribe();
  }

  addSong() {
    // Should route user to add songs page
    this.router.navigate(['add-song']);
  }

  deleteSong(song: Songs) {
    try {
      console.log('Deleting:: ', song);
      this.mutationSubscription$ = this.songsService
        .mutate({
          rank: song.rank,
        })
        .subscribe(
          (response) => {
            console.log('response: ', response);
          },
          (error) => catchError(error)
        );
    } catch (error) {
      console.log('Caught Error => ', error);
    }
  }

  editSong(song: Songs) {
    console.log('Deleting:: ', song);
  }
}
