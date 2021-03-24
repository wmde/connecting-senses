import SensesRepository, { SenseInfo } from '@/data-access/SensesRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';

export default class FetchSensesRepository implements SensesRepository {
	private readonly endpoint;

	public constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	public async getSensesWithoutItems( languageCode: string, languageQid: string ): Promise<SenseInfo[]> {
		const nounQid = 'Q1084';
		const itemForThisSensePid = 'P5137';
		const translationPid = 'P5972';
		const numberOfSensesPerRequest = 10;
		const SPARQL = `
		SELECT DISTINCT ?lexemeId ?lemma ?senseId ?gloss
WHERE {
  ?lexemeId dct:language wd:${languageQid};
            wikibase:lexicalCategory wd:${nounQid};
            wikibase:lemma ?lemma;
            ontolex:sense ?senseId.
  ?senseId skos:definition ?gloss.
  FILTER(LANG(?gloss) = "${languageCode}")
  MINUS { ?senseId wdt:${itemForThisSensePid} [] }
  MINUS { ?senseId wdt:${translationPid} [] }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${languageCode}". }
}
LIMIT ${numberOfSensesPerRequest}
		`;
		const params: { [ key: string ]: string } = {
			format: 'json',
			query: SPARQL,
		};

		const url = new URL( this.endpoint );
		for ( const key in params ) {
			url.searchParams.set( key, params[ key ] );
		}
		let response: Response;
		try {
			response = await fetch( url.toString() );
		} catch ( e ) {
			throw new TechnicalProblem( 'Network error' );
		}

		if ( !response.ok ) {
			throw new TechnicalProblem( `${response.status}: ${response.statusText}` );
		}

		const data = await response.json();

		const bindings = data.results.bindings;

		const senseInfo = bindings.map( ( binding: {
			gloss: { value: string; };
			lemma: { value: string; };
			lexemeId: { value: string; }; // TODO: do we actually need this?
			senseId: { value: string };
		} ) => {
			const senseUri = binding.senseId.value;
			const senseId = senseUri.match( /L\d+-S\d+/ );
			if ( !senseId ) {
				throw new Error( 'Unknown format for sense URI: ' + senseUri );
			}
			return {
				gloss: binding.gloss.value,
				lemma: binding.lemma.value,
				senseId: senseId[ 0 ],
			};
		} );

		return senseInfo;
	}
}
