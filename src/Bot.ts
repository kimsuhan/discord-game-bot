import { Client } from 'discord.js';
import connect from './Connect';

const token = "OTQwNDQ4OTc5NTU1MDY1OTY3.YgHjXQ.kelRL85ti6gEtO_P1g-xKGz4enY";

console.log('Bot is starting...');

const client = new Client({
    intents: []
});

connect(client);