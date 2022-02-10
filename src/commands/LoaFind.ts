import { ApplicationCommandOptionData, BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import crawl from '../module/crawl';
import extract from '../module/extract';

const Opt: ApplicationCommandOptionData = {
    type:"STRING",
    name: "name",
    description: "Chracter Name",
    required: true
}

export const LoaFind: Command = {
    name: "loafind",
    description: "Lostark Chracter Find",
    type: "CHAT_INPUT",
    options: [Opt],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const data = interaction.options.data;
        const nameData = data.find(item => item.name === 'name');
        const name = nameData === undefined ? '' : nameData.value;


        const testData = await crawl(`https://lostark.game.onstove.com/Profile/Character/${name}`);
        const loaInfo = await extract(testData);


        const embdeds = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${name}`)
            .setURL(`https://lostark.game.onstove.com/Profile/Character/${name}`)
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            // .setDescription('Some description here')
            .setThumbnail(loaInfo.class_icon)
            .addFields(
                { name: '달성 아이템 레벨', value: loaInfo.level.split('Lv.')[1] },
                // { name: '\u200B', value: '\u200B' },
                // { name: 'Inline field title', value: 'Some value here', inline: true },
                // { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            // .addField('Inline field title', 'Some value here', true)
            .setImage(loaInfo.class_image)
            .setTimestamp()
            .setFooter({ text: 'by Kim Suhan' });

        // console.log(t);

        await interaction.followUp({
            ephemeral: true,
            embeds: [embdeds]
        })
    }
}

