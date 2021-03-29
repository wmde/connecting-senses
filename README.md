# Connecting Senses

A tool for connecting Lexeme Senses with the corresponding Wikidata Items.

# Usage

Authentication is done via OAuth with Wikidata.

Select an Item for the language in which you would like to receive senses.
You will then receive a Lemma and a Sense. Search for the corresponding wikidata item in the search field.
You may decide between connecting the item to this sense in Wikidata, skipping to the next sense or removing this sense from suggestion altogether.

# Run development instance

Note: This tool uses Node 10 and npm 6.14.

- create a local `.env` file (see `.env.example` for reference)
- In order to start your local development environment, first run `npm i` to install dependencies.
- For the frontend environment run:
    `npm run serve`
- For backend development run:
    `npx nodemon --inspect server.js`
Per default, the tool will be running locally at `http://localhost:8080/ `.
