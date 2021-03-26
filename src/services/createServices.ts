import ServiceContainer from '@/services/ServiceContainer';
import FetchUserRepository from '@/data-access/FetchUserRepository';
import FetchSearchEntityRepository from '@/data-access/FetchSearchEntityRepository';
import FetchReadingClaimsRepository from '@/data-access/FetchReadingClaimsRepository';
import FetchSensesRepository from '@/data-access/FetchSensesRepository';
import FetchReadingEntityRepository from '@/data-access/FetchReadingEntityRepository';
import FetchClaimWritingRepository from '@/data-access/FetchClaimWritingRepository';
import FetchDecisionRepository from '@/data-access/FetchDecisionRepository';

export default function createServices(): ServiceContainer {
	const services = new ServiceContainer();
	const wikidataApiUrl = 'https://www.wikidata.org/w/api.php'; // maybe make configurable at some point

	services.set( 'userRepository', new FetchUserRepository() );
	services.set( 'decisionRepository', new FetchDecisionRepository() );

	services.set( 'searchEntityRepository', new FetchSearchEntityRepository(
		'en', // our UI language is always English so far
		wikidataApiUrl,
	) );

	services.set( 'getClaimsRepository', new FetchReadingClaimsRepository(
		'en', // our UI language is always English so far
		wikidataApiUrl,
	) );

	services.set( 'sensesRepository', new FetchSensesRepository() );

	services.set( 'readingEntityRepository', new FetchReadingEntityRepository(
		wikidataApiUrl,
	) );

	services.set( 'claimWritingRepository', new FetchClaimWritingRepository(
		wikidataApiUrl,
	) );

	return services;
}
