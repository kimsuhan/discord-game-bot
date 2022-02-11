import { ApplicationCommandOptionData, BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../Command";
import { getCharacter } from '../module/lostarkCrawl';

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
        const typeEmoji = ':small_orange_diamond:';

        const chracterInfo = await getCharacter(String(name));

        if(chracterInfo === undefined) {
            await interaction.followUp({
                ephemeral: true,
                content: `${name}의 계정 정보가 검색되지 않습니다.`
            });

            return;
        }

        const embdeds = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${name}`)
            .setURL(`https://lostark.game.onstove.com/Profile/Character/${name}`)
            // .setAuthor({ name: '창술사'})
            .setDescription(`${chracterInfo.server} | ${chracterInfo.class.name}`)
            .setThumbnail(chracterInfo.class.icon)
            .addFields(
                { name: '달성 아이템 레벨', value: chracterInfo.itemLevel },
                { name: '전투 특성', value: `${typeEmoji} 치명 : ${chracterInfo.ability[0]} \n ${typeEmoji} 특화 : ${chracterInfo.ability[1]} \n ${typeEmoji} 제압 : ${chracterInfo.ability[2]}`, inline: true },
                { name: '\u200B', value: `${typeEmoji} 신속 : ${chracterInfo.ability[3]} \n ${typeEmoji} 인내 : ${chracterInfo.ability[4]} \n ${typeEmoji} 숙련 : ${chracterInfo.ability[5]}`, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
            )
            // .addField('\u200B', '\u200B')
            // .setImage(loaInfo.class_image)
            .setTimestamp()
            .setFooter({ text: 'by Kim Suhan' });

        // 악세서리 처리
        if(chracterInfo.equip.accessery !== undefined && chracterInfo.equip.accessery.length > 0) {
            let index = 0;
            chracterInfo.equip.accessery.forEach((item) => {
                if(item.type !== 'necklace') {
                    index++;
                };

                embdeds.addFields({
                    name:`| ${item.name}`,
                    value:`${item.ability.map((e)=> `${typeEmoji} ` + e).join('\n')} \n ${item.buff.map((e)=> `${typeEmoji} ` + e).join('\n')}`,
                    inline: item.type === 'necklace' ? false : true
                })

                if(index > 0 && index%2 === 0) {
                    embdeds.addFields({name: '\u200B', value:'\u200B', inline:true},)
                }
            });
        }

        // 장비 처리
        if(chracterInfo.equip.item !== undefined && chracterInfo.equip.item.length > 0) {
            chracterInfo.equip.item.forEach((item) =>  {
                embdeds.addFields({
                    name:`| ${item.name}`,
                    value:`${typeEmoji} 품질 : ${item.quality}`,
                    inline:true,
                })
            });
        }

        await interaction.followUp({
            ephemeral: false,
            embeds: [embdeds]
        })
    }
}

