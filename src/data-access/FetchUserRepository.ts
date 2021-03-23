import UserRepository, { User } from '@/data-access/UserRepository';

export default class FetchUserRepository implements UserRepository {
	async getCurrentUser(): Promise<User | null> {
		try {
			const response = await fetch( '/currentUser' );
			const user = await response.json();
			if (!user) {
				return null;
			}
			console.log( { user } );
			return user as User; // Todo: verify that this is the structure that we have here
		} catch ( e ) {
			console.log(e); // not json
			// TODO show better error depending on error
			return null;
		}
	}

}
