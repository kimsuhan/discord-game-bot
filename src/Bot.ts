import { Client } from 'discord.js';
import connect from './Connect';
import puppetter from './module/puppeteer';

console.log('Bot is starting...');

const client = new Client({
    intents: []
});

// puppetter Browser Open
puppetter();

connect(client);