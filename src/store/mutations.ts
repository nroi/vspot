import Vue from 'vue';
import {PhxMessage, PlayerMessage, PlaylistMessage, PlayerSong, RootState, PlayerStatus} from '@/types';
import {randomString, UPDATE_INTERVAL} from '@/shared';

export const SOCKET_ONOPEN = (state: RootState, event: any) => {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
    console.log('Websocket is connected.');
    const phxJoinPlayerMsg = {
        topic: 'player',
        event: 'phx_join',
        payload: {},
        ref: '1',
    };
    const phxJoinPlaylistMsg = {
        topic: 'playlist',
        event: 'phx_join',
        payload: {},
        ref: '2',
    };
    const phxJoinStatusMsg = {
        topic: 'status',
        event: 'phx_join',
        payload: {},
        ref: '3',
    };
    const phxJoinDatabaseMsg = {
        topic: 'database',
        event: 'phx_join',
        payload: {},
        ref: '4',
    };
    Vue.prototype.$socket.sendObj(phxJoinPlayerMsg);
    Vue.prototype.$socket.sendObj(phxJoinPlaylistMsg);
    Vue.prototype.$socket.sendObj(phxJoinStatusMsg);
    Vue.prototype.$socket.sendObj(phxJoinDatabaseMsg);
};

export const SOCKET_ONCLOSE = (state: RootState, event: any) => {
    state.socket.isConnected = false;
};

export const SOCKET_ONERROR = (state: RootState, event: any) => {
    console.error(state, event);
};

// default handler called for all methods
export const SOCKET_ONMESSAGE = (state: RootState, message: PhxMessage) => {
    console.log('Got message from topic ' + message.topic);
    if (message.topic === 'player' && message.event === 'changed') {
        const playerMessage = message.payload as PlayerMessage;
        console.log(JSON.stringify(message));
        Vue.set(state, 'currentSong', playerMessage.song);
        Vue.set(state, 'currentStatus', playerMessage.status);
        Vue.set(state.ui, 'elapsedTime', playerMessage.status.elapsed);
        // state.ui.elapsedTime = playerMessage.status.elapsed;
        console.log('Set song and status');
        // console.log(title);
        // state.socket.message = message;
    } else if (message.topic === 'playlist' && message.event === 'changed') {
        console.log('got playlist');
        console.log(message.payload);
        const playlistMessage = message.payload as PlaylistMessage;
        Vue.set(state, 'currentStatus', playlistMessage.status);
        const song = playlistMessage.songs.find((p: PlayerSong) => p.id === playlistMessage.current_id);
        Vue.set(state, 'currentSong', song);
        console.log('current song: ' + JSON.stringify(song));
        Vue.set(state, 'songs', playlistMessage.songs);
    } else if (message.topic === 'status' && message.event !== 'phx_reply') {
        const playerStatus: PlayerStatus = message.payload as PlayerStatus;
        Vue.set(state, 'currentStatus', playerStatus);
    }
    state.waitForPhoenix = false;
};

// mutations for reconnect methods
export const SOCKET_RECONNECT = (state: RootState, count: number) => {
    console.info(state, count);
};

export const SOCKET_RECONNECT_ERROR = (state: RootState) => {
    state.socket.reconnectError = true;
};

export const heartbeat = (state: RootState) => {
    const heartbeatMsg = {
        topic: 'phoenix',
        event: 'heartbeat',
        payload: {},
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(heartbeatMsg);
};

export const updateNow = (state: RootState) => {
    const diff = Date.now() - state.now;
    if (diff > UPDATE_INTERVAL * 100) {
        console.log('Wake up from suspend?');
        const msg = {
            topic: 'status',
            event: 'status',
            payload: {
                module: 'Paracusia.MpdClient.Status',
                function: 'status',
                arguments: [],
            },
            ref: randomString(),
        };
        Vue.prototype.$socket.sendObj(msg);
    }
    if (!state.waitForPhoenix) {
        state.now = Date.now();
    }
};

export const playId = (state: RootState, id: number) => {
    const msg = {
        topic: 'status',
        event: 'status',
        payload: {
            module: 'Paracusia.MpdClient.Playback',
            function: 'play_id',
            arguments: [id],
        },
        ref: randomString(),
    };
    Vue.prototype.$socket.sendObj(msg);
};

export const seek = (state: RootState, seconds: number) => {
    state.waitForPhoenix = true;
    state.elapsedSliding = false;
    if (state.currentSong) {
        const msg = {
            topic: 'status',
            event: 'status',
            payload: {
                module: 'Paracusia.MpdClient.Playback',
                function: 'seek_id',
                arguments: [state.currentSong.id, seconds],
            },
            ref: randomString(),
        };
        Vue.prototype.$socket.sendObj(msg);
    }
};

export const setVolume = (state: RootState, percent: number) => {
    state.waitForPhoenix = true;
    state.volumeSliding = false;
    if (state.currentSong) {
        const msg = {
            topic: 'status',
            event: 'status',
            payload: {
                module: 'Paracusia.MpdClient.Playback',
                function: 'set_volume',
                arguments: [percent],
            },
            ref: randomString(),
        };
        Vue.prototype.$socket.sendObj(msg);
    }
};
