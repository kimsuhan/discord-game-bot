import { Client } from 'discord.js';
import interactionCreate from './listners/interactionCreate';
import ready from './listners/ready';

const token = "OTQwNDQ4OTc5NTU1MDY1OTY3.YgHjXQ.kelRL85ti6gEtO_P1g-xKGz4enY";

export default async (client: Client): Promise<void> => {
    ready(client);
    interactionCreate(client);
    client.login(token);
};