# Connecting Senses

A tool for connecting Lexeme Senses with the corresponding Wikidata Items.

# Usage

Authentication is done via OAuth with Wikidata.

Select an Item for the language in which you would like to receive senses.
You will then receive a Lemma and a Sense. Search for the corresponding Wikidata Item in the search field.
You may decide between connecting the item to this sense in Wikidata, skipping to the next sense or removing this sense from suggestion altogether.

# Run development instance

Note: This tool uses Node 10 and npm 6.14.

- In order to start your local development environment, first run `npm i` to install dependencies.

## frontend development

- For the frontend environment run:
  `npm run serve` and open the browser to http://localhost:8080/

This will mock all requests to the local backend in the browser.
The configuration for the mock editing and mock data can be found in `src/mocks/`.

## server development

- create a local `.env` file (see `.env.example` for reference)
- you can spin up a development database with `docker-compose up`
  - this will make a mariaDB instance available on port 3306
  - the connection string in `.env.example` is already setup for this db
  - also adminer can be used at http://localhost:3000
- For backend development run:
    `npx nodemon --inspect server.js`
  - the backend development server will run at http://localhost:5000.
