import { createServer } from 'miragejs';
import senses from './senses.json';

export function makeServer( { environment = 'development' } = {} ): unknown {
	return createServer( {
		environment,

		routes() {
			this.get( '/currentUser', () => {
				return { displayName: 'TestUser (Mirage)' };
			} );

			this.post( '/decision' );
			this.post( '/connection-record' );

			this.get( '/senses', () => {
				return senses;
			} );

			this.passthrough( 'https://www.wikidata.org/**' );
			this.passthrough( 'https://query.wikidata.org/**' );
		},
	} );
}
