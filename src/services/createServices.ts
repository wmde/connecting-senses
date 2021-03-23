import ServiceContainer from '@/services/ServiceContainer';
import FetchUserRepository from '@/data-access/FetchUserRepository';

export default function createServices(): ServiceContainer {
	const services = new ServiceContainer();

	services.set( 'userRepository', new FetchUserRepository() );

	return services;
}
