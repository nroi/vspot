export interface RootState {
    socket: {
        isConnected: boolean,
        message: string,
        reconnectError: boolean,
    };
    currentSong?: PlayerSong;
    currentStatus?: PlayerStatus;
    now: number;
    ui: {
        elapsedTime: number;
    };
}


interface PlayerStatus {
    xfade: number;
    volume: number;
    updating_db: any;
    timestamp: number;
    time: string;
    state: string;
    song_pos: number;
    song_id: number;
    single: boolean;
    repeat: boolean;
    random: boolean;
    playlist_length: number;
    playlist: number;
    next_song_pos: any;
    next_song_id: any;
    mixrampdelay: any;
    mixrampdb: number;
    error: any;
    elapsed: number;
    consume: boolean;
    bitrate: number;
    audio: [ string, string, string ];
}

interface PlayerSong {
    track: string;
    title: string;
    id: number;
    file: string;
    duration_in_secs: number;
    duration: string;
    artist: string;
    album: string;
}



export interface PhxReply {
    topic: 'player' | 'playlist' | 'database' | 'mixer' | 'misc' | 'search';
    ref: string;
    event: 'phx_reply';
    payload: {
        status: 'ok',
    };
}

export interface PhxMessage {
    topic: 'player' | 'playlist' | 'database' | 'mixer' | 'misc' | 'search';
    ref: string;
    event: any;
    payload: PlaylistMessage | PlayerMessage;
}

interface PlaylistMessage {
    status: PlayerStatus;
    songs: PlayerSong[];
    current_id: number;
}

export interface PlayerMessage {
    status: PlayerStatus;
    song: PlayerSong;
}
