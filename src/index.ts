import { handlerWebServer } from './handlerWebServer'

console.log('remote_control')
import 'dotenv/config'

import { httpServer } from './http_server/index'
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws'
import { MousePosition } from './mousePosition'

const httpPort = process.env.HTTP_PORT || 8181
const socketPort = process.env.SOCKET_PORT || 8080

const wss: WebSocket.Server<WebSocket.WebSocket> = new WebSocketServer({ port: Number(socketPort) })
const clients: Set<WebSocket> = new Set()

const { clearPositions } = new MousePosition()

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf-8' })
  clearPositions()
  clients.add(ws)
  duplex.on('data', async (frontData) => {
    const response = await handlerWebServer({ frontData })

    ws.send(response)
  })

  ws.send('You have already been connected to the server')
})

console.log(`Start static http server on the ${httpPort} port!`)
httpServer.listen(httpPort)
