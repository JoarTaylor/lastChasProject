import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import path from "path";
import sqlite3 from "sqlite3";

const app = express();

interface FormData {
  name: string;
  email: string;
  message: string;
}

// SQLite database setup

const dbFilePath = path.join(__dirname, "data.db");
const db = new sqlite3.Database(dbFilePath);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS FormData (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)"
  );
});

// GraphQL schema setup
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
      formData: {
        type: new GraphQLList(
          new GraphQLObjectType({
            name: "FormData",
            fields: {
              id: { type: GraphQLInt },
              name: { type: GraphQLString },
              email: { type: GraphQLString },
              message: { type: GraphQLString },
            },
          })
        ),
        resolve: () => {
          return new Promise((resolve, reject) => {
            db.all("SELECT * FROM FormData", (err, rows) => {
              if (err) reject(err);
              else resolve(rows);
            });
          });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addFormData: {
        type: new GraphQLObjectType({
          name: "AddFormData",
          fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            message: { type: GraphQLString },
          },
        }),
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          message: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, { name, email, message }: FormData) => {
          return new Promise((resolve, reject) => {
            db.run(
              "INSERT INTO FormData (name, email, message) VALUES (?, ?, ?)",
              [name, email, message],
              function (err) {
                if (err) reject(err);
                else {
                  db.get(
                    "SELECT * FROM FormData WHERE id = ?",
                    [this.lastID],
                    (err, row) => {
                      if (err) reject(err);
                      else resolve(row);
                    }
                  );
                }
              }
            );
          });
        },
      },
    },
  }),
});

// Apply middleware
app.use(cors());
app.use(express.json());

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000);

app.post("/", async (req, res) => {
  const { email, message, name } = req.body as FormData;
  console.log(email);
  db.run("INSERT INTO FormData (name, email, message) VALUES (?, ?, ?)", [
    name,
    email,
    message,
  ]);
});
