import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Songs } from 'src/app/types';

@Component({
  selector: 'app-song-list',
  template: ` <div *ngFor="let item of songs">
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ item?.title }}</mat-card-title>
        <mat-card-subtitle>{{ item?.artist }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Year {{ item?.year }}</p>
        <p>Album {{ item?.album }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button
          (click)="delete.emit()"
          title="delete song"
          mat-icon-button
          color="warn"
          aria-label="Example icon button with a delete icon"
        >
          <mat-icon>delete</mat-icon>
        </button>
        <button
          (click)="edit.emit()"
          title="set/edit song"
          mat-icon-button
          color="primary"
          aria-label="Example icon button with a heart icon"
        >
          <mat-icon>edit</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  </div>`,
  styles: [
    `
      mat-card {
        margin: 10px;
      }

      div.container {
        display: inline-block;
        margin: 20px;
      }
      ,
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class SongListComponent implements OnInit {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   */

  // presentational component data
  @Input() songs: any;

  // Custom event emitters
  @Output() delete = new EventEmitter<Songs>();
  @Output() edit = new EventEmitter<Songs>();

  constructor() {}

  ngOnInit(): void {}
}
