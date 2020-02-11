import io from "socket.io-client";

const chat = io(`${process.env.VUE_APP_API_URL}/chat`);

export { chat };
