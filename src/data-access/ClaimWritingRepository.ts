export default interface ClaimWritingRepository {
	setClaim( itemId: string, senseId: string ): Promise<void>;
}
