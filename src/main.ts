import Vue from 'vue';
import App from './App.vue';
import Queue from './components/Queue.vue';
import Database from './components/Database.vue';
import store from './store/store';
import VueNativeSock from 'vue-native-websocket';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

const opts = {
    format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    store,
};
Vue.use(VueNativeSock, 'ws://localhost:4000/socket/websocket', opts);

Vue.use(Vuetify, {
    iconfont: 'mdi',
});

Vue.use(VueRouter);

Vue.filter('formatHHMMSS', (totalSeconds: number) => {
    totalSeconds = Math.trunc(totalSeconds);
    const totalHours = Math.trunc(totalSeconds / 3600);
    const restMinutes = Math.trunc((totalSeconds - totalHours * 3600) / 60);
    const restSeconds = totalSeconds - totalHours * 3600 - restMinutes * 60;

    const prefix = (duration: number) => duration < 10 ? '0' : '';
    const hoursString = totalHours > 0 ? `${prefix(totalHours)}${String(totalHours)}:` : '';
    const minutesString = `${prefix(restMinutes)}${String(restMinutes)}:`;
    const secondsString = `${prefix(restSeconds)}${String(restSeconds)}`;
    return hoursString + minutesString + secondsString;
});

const routes = [
    { path: '', component: Queue },
    { path: '/queue', component: Queue },
    { path: '/database', component: Database },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app');
