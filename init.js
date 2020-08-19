import app from "./app";

const PORT = 4000;

const handleListening = () =>
    console.log(`✅ Listening on: http://localhost:${PORT}`);

/**
 * Receiving user access to the Express Server (사용자의 접근을 기다림.)
 */
app.listen(PORT, handleListening);