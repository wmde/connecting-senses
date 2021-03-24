import UserRepository, { User } from '@/data-access/UserRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';

export default class FetchUserRepository implements UserRepository {
	public async getCurrentUser(): Promise<User | null> {
		try {
			const response = await fetch( '/currentUser' );

			if ( response.status === 401 ) {
				return null;
			}

			if ( !response.ok ) {
				throw new TechnicalProblem( `${response.status}: ${response.statusText}` );
			}

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
