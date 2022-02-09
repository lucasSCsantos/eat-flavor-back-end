import Sales from "@models/Sales";


export default (io: <ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> ) => {
  io.on('connection', (socket) => {
    console.log('Socket conectado');

    socket.on('salesUpdate', async ({ id, status }) => {
      try {
        await Sales.update(id, status);
        io.emit('refreshSaleStatus', { id, status });
      } catch (error) {
        io.emit('refreshSaleStatus', { message: error.message });
      }
    });
  });
};