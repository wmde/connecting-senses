import { Item } from '@/store/items';

export default interface ReadingEntityRepository {
	getFingerPrintableEntities( ids: string[], langCode: string ): Promise<Record<string, Item>>;
}
