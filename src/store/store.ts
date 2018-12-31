import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {RootState} from '@/types';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        now: Date.now(),
        ui: {
            elapsedTime: 0,
        },
        elapsedSliding: false,
        volumeSliding: false,
        prevElapsedSliderValue: -1,
        // true if we want to postpone UI updates until the next message from phoenix backend has been received
        // and processed.
        waitForPhoenix: false,
        filterInput: '',
    },
    mutations,
    actions,
    getters,
};

export default new Vuex.Store<RootState>(store);
