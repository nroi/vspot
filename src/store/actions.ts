import Vue from 'vue';
import {randomString} from '@/shared';
import {ActionContext} from 'vuex';
import {RootState} from '@/types';

type Context = ActionContext<RootState, RootState>;

export const sendObject = (context: Context, object: any) => {
    Vue.prototype.$socket.sendObj(object);
};

export const playNextSong = (context: Context) => {
    const msg = {
        topic: 'player',
        event: 'play_next_song',
        payload: {},
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const pause = (context: Context) => {
    const msg = {
        topic: 'player',
        event: 'pause_playback',
        payload: {},
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const play = (context: Context) => {
    const msg = {
        topic: 'player',
        event: 'play',
        payload: {},
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const playPreviousSong = (context: Context) => {
    const msg = {
        topic: 'player',
        event: 'play_previous_song',
        payload: {},
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const addToQueue = (context: Context, uri: string) => {
    const msg = {
        topic: 'database',
        event: 'add_uri',
        payload: {
            uri,
        },
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const setSnackbarText = (context: Context, text: string) => {
    context.commit('setSnackbarText', text);
};

export const setSnackbarStatus = (context: Context, status: 'success' | 'error') => {
    context.commit('setSnackbarStatus', status);
};

export const showSnackbar = (context: Context) => {
    context.commit('showSnackbar');
};

