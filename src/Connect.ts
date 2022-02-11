import { Client } from 'discord.js';
import interactionCreate from './listners/interactionCreate';
import ready from './listners/ready';
import 'dotenv/config'

export default async (client: Client): Promise<void> => {
    ready(client);
    interactionCreate(client);
    client.login(process.env.TOKEN);
};