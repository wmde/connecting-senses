export default interface UserRepository {
	getCurrentUser(): Promise<null | User>;
}

export interface User {
	displayName: string;
	userName: string;
	// TODO: add babel?
}
