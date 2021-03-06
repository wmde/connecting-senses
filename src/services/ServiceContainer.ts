import UserRepository from '@/data-access/UserRepository';
import SearchEntityRepository from '@/data-access/SearchEntityRepository';
import ReadingClaimsRepository from '@/data-access/ReadingClaimsRepository';
import SensesRepository from '@/data-access/SensesRepository';
import ReadingEntityRepository from '@/data-access/ReadingEntityRepository';
import ClaimWritingRepository from '@/data-access/ClaimWritingRepository';
import DecisionRepository from '@/data-access/DecisionRepository';

export interface Services {
	userRepository: UserRepository;
	decisionRepository: DecisionRepository;
	searchEntityRepository: SearchEntityRepository,
	getClaimsRepository: ReadingClaimsRepository,
	sensesRepository: SensesRepository,
	readingEntityRepository: ReadingEntityRepository,
	claimWritingRepository: ClaimWritingRepository,
}

export default class ServiceContainer {
	private readonly services: Partial<Services> = {};

	public set<K extends keyof Services>( key: K, service: Services[ K ] ): void {
		this.services[ key ] = service;
	}

	public get<K extends keyof Services>( key: K ): Services[ K ] {
		if ( this.services[ key ] === undefined ) {
			throw new Error( `${key} is undefined` );
		}

		return this.services[ key ] as Services[ K ];
	}

}
