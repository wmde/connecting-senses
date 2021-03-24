import UserRepository, { User } from '@/data-access/UserRepository';

export default class FetchUserRepository implements UserRepository {
	public async getCurrentUser(): Promise<User | null> {
		try {
			const response = await fetch( '/currentUser' );
			const user = await response.json();
			if ( !user ) {
				return null;
			}
			return user.displayName as User;
		} catch ( e ) {
			console.log( e );
			// TODO show better error depending on error
			return null;
		}
	}

}
