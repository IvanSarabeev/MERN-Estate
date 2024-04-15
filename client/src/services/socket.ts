import { Socket, io } from "socket.io-client";

const socket: Socket = io(`${import.meta.env.VITE_WEBSOCKET_IO}`);

export default socket;