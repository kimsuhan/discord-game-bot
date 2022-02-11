import { load } from 'cheerio';

// interface
interface LostarkChracter {
    class: {
        icon: string,
        name: string,
    };

    server: string;
    ability: string[];

    equip : {
        item?: [{
            name: string,
            quality: number,
        }];

        accessery?: [{
            name: string,
            type: string,
            ability: string[],
            buff: string[],
        }]
    }

    itemLevel: string;
}

const deleteHtml = (text:string) : string => {
    text = text.replaceAll('<BR>', "||");
    return text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
}

// ~~
const getCharacter = async (chracterName: string) : Promise<void | LostarkChracter> => {
    const returnValue : LostarkChracter = {
        class: {
            icon: '',
            name: '',
        },
        ability: [],
        server: '',
        itemLevel : '',
        equip: {},
    };

    // 전투정보실 URL
    const lostarkUrl = 'https://lostark.game.onstove.com/Profile/Character/';

    // 페이지 이동
    const page = await globalThis.browser.newPage();
    await page.goto(encodeURI(lostarkUrl + chracterName));
    const content = await page.content();
    const $$ = load(content);

    // ㅁㄴㅇㅁㄴ
    let $ :any;
    const data = await page.evaluate(() => $.Profile)
    if(data === undefined) {
        return;
    }
    const equipItems = $$('#profile-equipment > div.profile-equipment__slot > div');
    equipItems.each((index, list) => {
        const slotClass = $$(list).get(0).attribs['class'];
        const value = $$(list).get(0).attribs['data-item'];
        const EquipData = data.Equip[value];
        const slotNumber = Number(slotClass.substring(4));

        // 낀 장비가 없으면 Skip
        if(EquipData === undefined) {
            return true;
        }

        // 장비
        if(slotNumber < 7) {
            const item = {
                name: deleteHtml(EquipData['Element_000']['value']),
                quality: EquipData['Element_001']['value']['qualityValue'],
            }

            returnValue.equip.item === undefined ? returnValue.equip.item = [item] : returnValue.equip.item.push(item);
        }
        // 악세
        else if(slotNumber < 12) {
            let type:string = '';
            switch(slotNumber) {
                case 7 :
                    type = 'necklace'
                    break;
                case 8 :
                    type = 'earring1'
                    break;
                case 9 :
                    type = 'earring2'
                    break;
                case 10 :
                    type = 'ring1'
                    break;
                case 11 :
                    type = 'ring2'
                    break;
            }

            const accessery = {
                name: deleteHtml(EquipData['Element_000']['value']),
                type: type,
                ability: deleteHtml(EquipData['Element_006']['value']['Element_001']).replaceAll("활성도", "").split('||'),
                buff: deleteHtml(EquipData['Element_007']['value']['Element_001']).replaceAll("활성도", "").split('||'),
            }

            returnValue.equip.accessery === undefined ? returnValue.equip.accessery = [accessery] : returnValue.equip.accessery.push(accessery);
        }

        // console.log(EquipData);
        // console.log(EquipData !== undefined ? deleteHtml(EquipData['Element_000']['value']) : '');
        // returnValue.itemLevel = value.substring(9);
    });

    // #profile-equipment > div.profile-equipment__slot

    // 달성 아이템 레벨
    const itemLevels = $$('#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2');
    itemLevels.each((index, list) => {
        const value = $$(list).find('.level-info2__item').text();
        returnValue.itemLevel = value.substring(9);
    });

    // 대표 캐릭터 정보
    const mainChracterInfo = $$('#lostark-wrapper > div > main > div > div.profile-character-info');
    mainChracterInfo.each((index, list) => {
        returnValue.class.icon = $$(list).find('.profile-character-info__img').get(0).attribs.src;
        returnValue.class.name = $$(list).find('.profile-character-info__img').get(0).attribs.alt;
        returnValue.server = $$(list).find('.profile-character-info__server').text().substring(1);
    });

    // 전투 특성
    const ingameChracterInfo = $$('#profile-ability > div.profile-ability-battle > ul > li');
    ingameChracterInfo.each((index, list) => {
        returnValue.ability.push($$($$(list).find('span').get(1)).text());
    });


    // 페이지 Close
    await page.close();

    console.log(returnValue);

    return returnValue;
}

export {
    getCharacter
};
