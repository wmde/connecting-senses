import { Item } from '@/store/items';
import { StatementMap, TermList } from '@wmde/wikibase-datamodel-types';

export interface Lexeme {
	id: string,
	senses: {
		id: string,
		glosses: TermList,
		claims: StatementMap,
	}[],
}

export type Entity = Item | Lexeme;

export default interface ReadingEntityRepository {
	getFingerPrintableEntities( ids: string[], langCode: string ): Promise<Record<string, Entity>>;
}
