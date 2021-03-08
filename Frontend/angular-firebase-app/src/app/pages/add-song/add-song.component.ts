import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const AddSongMutation = gql`
  mutation addSong(
    $album: String!
    $artist: String!
    $rank: Int!
    $title: String!
    $year: Int!
  ) {
    addSong(
      album: $album
      artist: $artist
      rank: $rank
      title: $title
      year: $year
    ) {
      title
    }
  }
`;

@Component({
  selector: 'app-add-song',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add Song</mat-card-title>
        <mat-card-subtitle
          >Add a songs to the songs collection</mat-card-subtitle
        >
      </mat-card-header>
      <mat-card-content>
        <div class="form-container">
          <form
            class="form"
            [formGroup]="addSongsForm"
            (ngSubmit)="onSubmit()"
            novalidate
          >
            <p>
              <mat-form-field appearance="legacy">
                <mat-label>Title</mat-label>
                <input
                  matInput
                  placeholder="Placeholder"
                  formControlName="title"
                />
                <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                <mat-hint *ngIf="validationState('title')"
                  >Hint: Add song title field is required</mat-hint
                >
              </mat-form-field>
            </p>
            <p>
              <mat-form-field appearance="standard">
                <mat-label>Artist</mat-label>
                <input
                  matInput
                  placeholder="Placeholder"
                  formControlName="artist"
                />
                <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                <mat-hint *ngIf="validationState('artist')"
                  >Hint:Add song title field is required</mat-hint
                >
              </mat-form-field>
            </p>
            <p>
              <mat-form-field appearance="fill">
                <mat-label>Album</mat-label>
                <input
                  matInput
                  placeholder="Placeholder"
                  formControlName="album"
                />
                <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                <mat-hint *ngIf="validationState('album')"
                  >Hint:Add song title field is required</mat-hint
                >
              </mat-form-field>
            </p>
            <p>
              <mat-form-field appearance="outline">
                <mat-label>Year</mat-label>
                <input
                  matInput
                  placeholder="Placeholder"
                  formControlName="year"
                  type="number"
                />
                <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                <mat-hint *ngIf="validationState('year')"
                  >Hint:Add song title field is required</mat-hint
                >
              </mat-form-field>
            </p>
            <p>
              <mat-form-field appearance="outline">
                <mat-label>Rank</mat-label>
                <input
                  matInput
                  placeholder="Placeholder"
                  formControlName="rank"
                  type="number"
                />
                <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                <mat-hint *ngIf="validationState('rank')"
                  >Hint:Add song title field is required</mat-hint
                >
              </mat-form-field>
            </p>
            <p>
              <button mat-raised-button color="danger" (click)="cancel()">
                CANCEL
              </button>
              <button mat-raised-button color="primary">ADD</button>
            </p>
          </form>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin: 20px;
      }

      mat-form-field {
        width: 100%;
      }

      .mat-raised-button {
        margin-right: 5px;
      }
    `,
  ],
})
export class AddSongComponent implements OnInit {
  addSongsForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addSongsForm = this.fb.group({
      album: ['', Validators.required],
      artist: ['', Validators.required],
      rank: ['', Validators.required],
      title: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  validationState(field: string | (string | number)[]) {
    let control: AbstractControl | null = this.addSongsForm.get(field);
    if (control) return control.valid === false;
    else return true;
  }

  fieldValue(field: string | (string | number)[]) {
    const control = this.addSongsForm.get(field);
    if (control) return control.value;
  }

  get request() {
    return {
      album: this.fieldValue('album'),
      artist: this.fieldValue('artist'),
      rank: this.fieldValue('rank'),
      title: this.fieldValue('title'),
      year: this.fieldValue('year'),
    };
  }

  cancel() {
    this.router.navigate(['']);
  }

  onSubmit() {
    console.log('Submiting form with value:: ', this.addSongsForm.value);
    if (this.addSongsForm.valid) {
      this.apollo
        .use('expressFirebaseServer')
        .mutate({
          mutation: AddSongMutation,
          variables: this.request,
        })
        .subscribe(
          ({ data }) => {
            console.log('got data', data);
          },
          (error) => {
            console.log('there was an error sending the query', error);
          }
        );
    }
  }
}
