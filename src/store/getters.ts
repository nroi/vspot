import {RootState} from '@/types';

export const currentSongDuration = (state: RootState) => {
    // TODO: get the actual time from the backend and format it accordingly.
    if (state.currentSong) {
        return state.currentSong.duration_in_secs;
    } else {
        console.log('current song is NOT set.');
        return 0;
    }
};

export const uiElapsedTime = (state: RootState) => {
    let newElapsedSliderValue = state.prevElapsedSliderValue;
    if (state.currentStatus && !state.elapsedSliding && !state.waitForPhoenix) {
        if (state.currentStatus.state === 'play') {
            const diff = state.now * 1000 - state.currentStatus.timestamp;
            newElapsedSliderValue = state.currentStatus.elapsed + diff / 1000000;
        } else {
            newElapsedSliderValue = state.currentStatus.elapsed;
        }
    } else if (state.currentStatus && state.elapsedSliding) {
        newElapsedSliderValue = state.prevElapsedSliderValue;
    } else if (!state.waitForPhoenix) {
        newElapsedSliderValue = 0;
    }
    state.prevElapsedSliderValue = newElapsedSliderValue;
    return newElapsedSliderValue;
};

export const uiVolume = (state: RootState) => {
    return state.currentStatus ? state.currentStatus.volume : 0;
};

