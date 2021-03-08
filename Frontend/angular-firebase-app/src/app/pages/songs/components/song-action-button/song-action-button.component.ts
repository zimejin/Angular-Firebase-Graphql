import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-song-action-button',
  template: `
    <p>
      <button
        mat-fab
        color="primary"
        aria-label="Example icon button with a delete icon"
        (click)="add.emit()"
      >
        <mat-icon>add</mat-icon>
      </button>
    </p>
  `,
  styles: [
    `
      p {
        position: fixed;
        bottom: 0px;
        right: 10px;
      }
    `,
  ],
})
export class SongActionButtonComponent implements OnInit {
  @Output() add = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
