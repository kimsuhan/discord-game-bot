import { ApplicationCommandOptionData, BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

const Opt: ApplicationCommandOptionData = {
    type:"STRING",
    name: "str",
    description: "str Description",
    required: true,
}

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: "CHAT_INPUT",
    options: [Opt],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello there!";

        const data = interaction.options.data;
        console.log(data.find(item => item.name === 'str'));

        await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}

