import { createServer } from 'miragejs';

export function makeServer( { environment = 'development' } = {} ): unknown {
	return createServer( {
		environment,

		routes() {
			this.get( '/currentUser', () => {
				return { displayName: 'TestUser (Mirage)' };
			} );

			this.passthrough( 'https://www.wikidata.org/**' );
			this.passthrough( 'https://query.wikidata.org/**' );
		},
	} );
}
