// GraphQL Setup
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Firebase imports
const serviceAccount = require("../../firestore-server-b8d74-firebase-adminsdk-q14tv-b4d6e85fad.json");
const admin = require("firebase-admin");

// Initialize Firebase Node.js Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore Realtime Database
const fireStoreDB = admin.firestore();

const SongType = new GraphQLObjectType({
  name: "Songs",
  description: "List of all songs available",
  fields: () => ({
    album: { type: GraphQLString },
    artist: { type: GraphQLString },
    rank: { type: GraphQLInt },
    title: { type: GraphQLString },
    year: { type: GraphQLInt },
  }),
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    songs: {
      type: GraphQLList(SongType),
      resolve: async () =>
        (await fireStoreDB.collection("songs").get()).docs.map((song) =>
          song.data()
        ),
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addSong: {
      type: GraphQLList(SongType),
      args: {
        album: { type: GraphQLNonNull(GraphQLString) },
        artist: { type: GraphQLNonNull(GraphQLString) },
        rank: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        await fireStoreDB.collection("songs").add({
          album: args.album,
          artist: args.artist,
          rank: args.rank,
          title: args.title,
          year: args.year,
        });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
