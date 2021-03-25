export interface ItemDataValue {
	type: 'wikibase-entityid',
	value: {
		'entity-type': 'item',
		id: string,
		'numeric-id': number,
	},
}

export interface Claim {
	mainsnak: {
		snaktype: 'value' | 'novalue' | 'somevalue';
		property: string;
		datatype: string;
		datavalue: {
			type: string;
			value: unknown;
		} | ItemDataValue
	};
	rank: 'deprecated' | 'normal' | 'preferred';
	id: string;
}

export default interface ReadingClaimsRepository {
	getClaims( entityID: string, propertyId?: string ): Promise<Record<string, Claim[]>>;
}
