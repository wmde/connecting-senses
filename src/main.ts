import { createApp } from 'vue'
import App from './App.vue'
import createServices from '@/services/createServices';
import createStore from './store';

const services = createServices();

const store = createStore( services );
store.dispatch( 'initApp' );

createApp(App).use(store).mount('#app')
