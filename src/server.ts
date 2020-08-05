import app from './app'
import http from 'http'
import socketIo from 'socket.io'

const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('New client connected')
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('updateTodos', (pageId: string) => {
    console.log('sending to ' + pageId)
    io.emit('pages', { msg: 'oi' })
  })
})

export { io }

server.listen(3000)
