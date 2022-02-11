import { ApplicationCommandOptionData, BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import {getCharacter} from '../module/lostarkCrawl';

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = `Hello there!`;

        // await getCharacter('보리스나');

        await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}

