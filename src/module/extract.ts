import { load } from 'cheerio';
import puppeteer from 'puppeteer';

export default async (html: string) : Promise<any> => {
    if(html === '') return {};

    const $1 = load(html);

    // class image
    const classIconKeywords = $1(
        '.profile-character-info',
    );

    const classIconImage: string[] = $1(classIconKeywords)
        .map((i, ele): string => {
                return $1(ele).find('.profile-character-info__img').get(0).attribs.src;
            },
        ).get();

    // level
    const levelKeywords = $1(
        '.level-info2__item',
    );

    const levelData: string[] = $1(levelKeywords)
        .map((i, ele): string => {
                return $1(ele).text();
            },
        ).get();

    // charctor image
    const chractorKeywords = $1(
        '#profile-equipment .profile-equipment__character',
    );

    const chractorImage: string[] = $1(chractorKeywords)
        .map((i, ele): string => {
                return $1(ele).find('img')[0].attribs.src;
            },
        ).get();

    // test
    // var url = 'https://lostark.game.onstove.com/Profile/Character/akak';
    // const browser = await puppeteer.launch({
    //     headless: true,
    //     args: ['--no-sandbox']
    // });
    // const page = await browser.newPage();
    // await page.goto(url);

    // let $ :any;
    // const data = await page.evaluate(() => $.Profile)

    // console.log(data);


    return {
        class_icon : classIconImage[0],
        class_image: chractorImage[0],
        level : levelData[0]
    };
}

// profile-equipment__character

// itemlv = bsObject.find_all("div", {"class": "level-info2__item"})[0].find_all("span")[1]
