import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueNativeSock from 'vue-native-websocket';

Vue.config.productionTip = false;

const opts = {
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    store,
};
Vue.use(VueNativeSock, 'ws://localhost:4000/socket/websocket', opts);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
