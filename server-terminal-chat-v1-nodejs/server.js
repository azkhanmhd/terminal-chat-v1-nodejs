const net = require('net');
const chalk = require('chalk');

// Server Data
const serverData = {
  HOST: "localhost",
  PORT: 3000
}

// Store Connected Clients
const clients = [];

// Just For Decoration... Hehe..
console.log(chalk.red(`\n↳ Server Loading... => ${serverData.HOST}:${serverData.PORT}!\n`));

// To Handle New Clients
const server = net.createServer((socket) => {

  // Creates a Temporay Name Till Client Enters a One (Guest_1) 
  socket.name = `Guest_${clients.length + 1}`;
  socket.key = null;
  clients.push(socket);

  socket.write('Enter your name:\n');

  let step = 0;

  socket.on('data', (data) => {
    const input = data.toString().trim();
    console.log(input);

    if (step === 0) {
      socket.name = input;
      socket.write('Enter your shared key:\n');
      step++;
    } else if (step === 1) {
      socket.key = input;
      socket.write(`Welcome, ${socket.name}! Start chatting.\n`);
      step++;
    } else {
      clients.forEach(client => {
        if (client !== socket && client.key === socket.key) {
          client.write(`${socket.name} (encrypted): ${data}`);
        }
      });
    }
  });

  socket.on('close', () => {
    clients.splice(clients.indexOf(socket), 1);
  });

  // Prevent Crash When a Client Disconnects
  socket.on('error', (err) => {
    console.log(chalk.red(`Error with client ${socket.name}: ${err.message}`));
  });

  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(serverData.PORT, serverData.HOST, () => {
  console.log(chalk.green(`[✔ Succeed]\n`));
  console.log(chalk.greenBright(`[✔] Main Chat Server Running In ${serverData.HOST}:${serverData.PORT}`));
});
