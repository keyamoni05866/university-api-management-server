import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

//mongoose connection and server connection

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

//for asynchronous
process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is detected, shutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//for synchronous
process.on('uncaughtException', () => {
  console.log('uncaughtException Rejection is detected, shutting down...');

  process.exit(1);
});

// console.log(x);
