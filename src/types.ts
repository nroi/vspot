export interface RootState {
    player_status: 'unknown' | 'playing' | 'paused';
    socket: {
        isConnected: boolean,
        message: string,
        reconnectError: boolean,
    };
}
