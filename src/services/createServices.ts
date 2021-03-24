import ServiceContainer from '@/services/ServiceContainer';
import FetchUserRepository from '@/data-access/FetchUserRepository';
import FetchSearchEntityRepository from '@/data-access/FetchSearchEntityRepository';
import FetchReadingClaimsRepository from '@/data-access/FetchReadingClaimsRepository';

export default function createServices(): ServiceContainer {
	const services = new ServiceContainer();

	services.set( 'userRepository', new FetchUserRepository() );

	services.set( 'searchEntityRepository', new FetchSearchEntityRepository(
		'en', // our UI language is always English so far
		'https://www.wikidata.org/w/api.php', // maybe make configurable at some point
	) );

	services.set( 'getClaimsRepository', new FetchReadingClaimsRepository(
		'en', // our UI language is always English so far
		'https://www.wikidata.org/w/api.php', // maybe make configurable at some point
	) );

	return services;
}
