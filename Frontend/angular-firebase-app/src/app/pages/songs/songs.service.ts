import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SongsServiceGQL extends Mutation {
  document = gql`
    mutation deleteSong($rank: Int!) {
      deleteSong(rank: $rank) {
        title
        artist
        album
        year
        rank
      }
    }
  `;
}
