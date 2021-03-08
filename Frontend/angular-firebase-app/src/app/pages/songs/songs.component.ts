import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Songs } from 'src/app/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  template: `
    <div class="container">
      <app-song-list [songs]="songs$ | async"></app-song-list>
      <app-song-action-button (add)="addSong()"></app-song-action-button>
    </div>
  `,
  styles: [``],
})
export class SongsComponent implements OnInit {
  songs$!: Observable<Songs[]>;
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private router: Router) {}

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
            }
          }
        `,
        pollInterval: 500,
      })
      .valueChanges.pipe(
        map((response: any) => response.data.songs as Songs[])
      );

    this.songs$.subscribe(console.log);
  }

  addSong() {
    // Should route user to add songs page
    this.router.navigate(['add-song']);
  }
}
