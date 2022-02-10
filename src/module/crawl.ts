import request, {CoreOptions} from 'request';

export default async (url : string) : Promise<string> => {
    const encodeUrl = encodeURI(url);
    const headers : any = {
        'headers' : {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    }

    return new Promise<string>((resolve, reject) => {
        request.get(encodeUrl, headers, (err, res) => {
            if (err)
                reject(err);
            resolve(res.body);
        });
    });
}