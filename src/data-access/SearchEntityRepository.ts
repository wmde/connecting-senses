
export interface SearchResult {
	id: string;
	label: string;
	description: string;
}

export interface SearchOptions {
	search: string;
	limit?: number;
	offset?: number;
}

/**
 * Repository to search for entities.
 * The language will be defined in the constructor as will be further options
 */
export default interface SearchEntityRepository {
	searchItemValues( searchString: string, limit?: number, offset?: number ): Promise<SearchResult[]>;
}
