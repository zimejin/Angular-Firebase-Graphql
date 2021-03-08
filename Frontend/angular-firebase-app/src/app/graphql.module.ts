import { NgModule } from '@angular/core';
import {
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
  NamedOptions,
} from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://48p1r2roz4.sse.codesandbox.io'; // our GraphQL API

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          expressFirebaseServer: {
            // <-- this settings will be saved by name: newClientName
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'http://localhost:4000/graphql',
            }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
