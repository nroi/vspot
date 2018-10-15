import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        player_status: 'unknown',
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget;
            state.socket.isConnected = true;
            console.log('Websocket is connected.');
            const msg1 = {
                topic: 'player',
                event: 'phx_join',
                payload: {},
                ref: '1',
            };
            Vue.prototype.$socket.sendObj(msg1);
        },
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false;
        },
        SOCKET_ONERROR(state, event) {
            console.error(state, event);
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, message)  {
            console.log('Got message from topic ' + message.topic);
            if (message.topic === 'player' && message.event === 'changed') {
                console.log(JSON.stringify(message));
                const title = message.payload.song.title;
                console.log(title);
                state.socket.message = message;
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count);
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    },
    actions: {
        sendMessage(context, message) {
            // ...
            Vue.prototype.$socket.send(message);
            // ...
        },
    },
};

export default new Vuex.Store<RootState>(store);
