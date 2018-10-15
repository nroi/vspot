import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        player_status: 'unknown',
    },
    mutations: {
    },
    actions: {
    },
};

export default new Vuex.Store<RootState>(store);
