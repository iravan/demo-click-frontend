import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object
const IS_REMOTE_SERVER = true;
const URL = IS_REMOTE_SERVER
  ? "http://65.109.96.160:3000"
  : "http://localhost:3000";

export const socket = io(URL!!);
