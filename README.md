# Note app (endpoint)

Simple Express-based application with Yup object schema validation

## Installing

For starting the project on your local machine clone repo locally and use `npm install` to install all dependencies then `npm start` for running.

You also could use [deployed version](https://thin-opaque-bookcase.glitch.me/notes)

## Functionality

To work with request and response bodies use JSON format

| Query type | Endpoint     | Action                                                                                           |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------ |
| POST       | /notes       | Create a note object `{ category: string, content: string } `                                    |
| DELETE     | /notes/:id   | Remove item.                                                                                     |
| PATCH      | /notes/:id   | Edit item `{ category: string, content: string } \|\| {category: string} \|\| {content: string}` |
| GET        | /notes/:id   | Retrieve item.                                                                                   |
| GET        | /notes       | Get all notes.                                                                                   |
| GET        | /notes/stats | Get aggregated data statistics                                                                   |
