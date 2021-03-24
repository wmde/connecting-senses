import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import App from './App.vue';
import createServices from '@/services/createServices';
import createStore from './store';
import { makeServer } from '@/mocks/mirageServer';

if ( process.env.NODE_ENV === 'development' ) {
	makeServer();
}

const services = createServices();

const store = createStore( services );
store.dispatch( 'initApp' );

createApp( App ).use( store ).use( PrimeVue ).mount( '#app' );
