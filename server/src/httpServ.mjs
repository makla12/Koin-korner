import { createServer } from "http";
import app from './express.mjs';

const httpServer = createServer(app);
httpServer.listen(8080, ()=>{console.log("Server started on port 8080")});

export default httpServer;