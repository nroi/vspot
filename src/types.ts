export interface RootState {
    socket: {
        isConnected: boolean,
        message: string,
        reconnectError: boolean,
    };
    currentSong?: PlayerSong;
    currentStatus?: PlayerStatus;
    now: number;
    waitForPhoenix: boolean;
    ui: {
        elapsedTime: number;
    };
    elapsedSliding: boolean;
    volumeSliding: boolean;
    prevElapsedSliderValue: number;
    filterInput: string;
    snackbar: {
        visible: boolean,
        text: string,
        timeout: number,
        multiline: boolean,
        status: 'success' | 'error';
    };
}

export interface PlayerStatus {
    xfade: number;
    volume: number;
    updating_db: any;
    timestamp: number;
    time: string;
    state: 'play' | 'pause' | 'stop';
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

export interface PlayerSong {
    track: string;
    title: string;
    id: number;
    file: string;
    duration_in_secs: number;
    artist: string;
    album: string;
}

export interface DatabasePlayerSong {
    type: 'DatabasePlayerSong';
    duration: string;
    file: string;
    Title?: string;
    Artist?: string;
    Album?: string;
    AlbumArtist?: string;
    Track?: string;
    name: string;
}

export interface DatabaseDirectory {
    type: 'DatabaseDirectory';
    directory: string;
    name: string;
}

export type DatabaseEntry = DatabasePlayerSong | DatabaseDirectory;

export interface PhxMessage {
    topic: 'player' | 'playlist' | 'database' | 'mixer' | 'misc' | 'search' | 'status';
    ref: string;
    event: any;
    payload: PlaylistMessage | PlayerMessage | PlayerStatus;
}

export interface PlaylistMessage {
    status: PlayerStatus;
    songs: PlayerSong[];
    current_id: number;
}

export interface PlayerMessage {
    status: PlayerStatus;
    song: PlayerSong;
}
