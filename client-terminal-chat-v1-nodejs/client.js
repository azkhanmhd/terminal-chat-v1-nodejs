const net = require('net');
const readline = require('readline');
const chalk = require('chalk'); // chalk@4
const { encrypt, decrypt } = require('./cryptoHelper');

// Main Server Data
const serverData = {
  HOST: "localhost",
  PORT: 3000
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let username = '';
let secretKey = '';
let isConnected = false;

const client = net.createConnection({ port: serverData.PORT, host: serverData.HOST }, () => {
  isConnected = true;
  console.log(chalk.green(`Connected to chat server at ${serverData.HOST}:${serverData.PORT}`));
});

client.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.log(chalk.red(`\n[✘] Couldn't connect to ${serverData.HOST}:${serverData.PORT} ☒`));
  } else if (err.code === 'ECONNRESET') {
    console.log(chalk.red(`\n[✘] `) + chalk.redBright(`Disconnected From Server - ${serverData.HOST}:${serverData.PORT} ☒`));
  } else {
    console.log(chalk.red(err.message));
  }
  process.exit(1);
});

client.on('data', (data) => {

  const msg = data.toString().trim();

  if (msg.startsWith('Enter your name')) {
    rl.question('Your name : ', (name) => {
      username = name;
      client.write(name + '\n');
    });
  } else if (msg.startsWith('Enter your shared key')) {
    rl.question('Shared Key: ', (key) => {
      secretKey = key;
      client.write(key + '\n');
    });
  } else if (msg.startsWith(username)) {
    console.log(chalk.cyanBright(msg)); 
  } else if (msg.includes('(encrypted):')) {
    const parts = msg.split('(encrypted):');
    const sender = parts[0].trim();
    const encMsg = parts[1].trim();
    const decrypted = decrypt(encMsg, secretKey);
    console.log(chalk.yellow(`${sender}: ${decrypted}`));
  } else {
    console.log(chalk.white(msg));
  }
});

rl.on('line', (line) => {
  if (secretKey) {
    const encrypted = encrypt(line, secretKey);
    client.write(encrypted + '\n');
  } else {
    console.log('Enter the shared key first.');
  }
});
