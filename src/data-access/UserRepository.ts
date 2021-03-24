export type User = string;

export default interface UserRepository {
	getCurrentUser(): Promise<null | User>;
}
