console.log('remote_control')
import 'dotenv/config'

import { httpServer } from './http_server/index'
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws'

const httpPort = process.env.HTTP_PORT || 8181
const socketPort = process.env.SOCKET_PORT || 8080

const ws: WebSocket.Server<WebSocket.WebSocket> = new WebSocketServer({ port: Number(socketPort) })

console.log(`Start static http server on the ${httpPort} port!`)
httpServer.listen(httpPort)
