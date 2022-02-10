import { ApplicationCommandOptionData, BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const Reload: Command = {
    name: "reload",
    description: "Reload Bot",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello there!";

        await interaction.followUp({
            ephemeral: true,
            content
        });

        const token = client.token;

        client.destroy();
        client.login(token === null ? undefined : token);
    }
}

