export default interface UserRepository {
	getCurrentUser(): Promise<null | User>;
}

export type User = string;
