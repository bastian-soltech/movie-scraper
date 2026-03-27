// for streaming
// https://api.ytbvideoly.com/share/streaming?uk=4401094499391&shareid=2807324453&sign=9d06150a741b16b2da92bf646e749b263222af63&jsToken=ewre&type=M3U8_FLV_264_480&fid=37976682331932&esl=1&play_from=4khot_b&isplayer=1&ehps=1&clienttype=1&app_id=250528&web=1&channel=dubox&timestamp=177375439898989410

export async function GetHotMovie(type,page=1){
const data = await fetch(`https://api.ytbvideoly.com/api/resconsume/hotlist?res_type=${type}&page=${page}&count=10&lang=ID&from_channel=11&hot_order_type=plays_pv&source_domain=layarkaca.id`,{
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Origin': 'https://layarkaca.id',
        'Referer': 'https://layarkaca.id/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'TE': 'trailers'
    }
})
const json = await data.json()
return json

}

export async function GetDetailMovie(enid) {
    const data = await fetch(`https://api.ytbvideoly.com/api/resconsume/detail?enid=${enid}&lang=ID&from_channel=11&hot_order_type=plays_pv&source_domain=layarkaca.id`,{
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Origin': 'https://layarkaca.id',
        'Referer': 'https://layarkaca.id/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'TE': 'trailers'
    }
})
const json = await data.json()
const movieDetail = await json.data


return movieDetail

}


export async function GetStreamMovie(uk,share_id,fid) {
    const data = await fetch(`https://api.ytbvideoly.com/share/streaming?uk=${uk}&shareid=${share_id}&sign=9d06150a741b16b2da92bf646e749b263222af63&jsToken=ewre&type=M3U8_FLV_264_480&fid=${fid}&esl=1&play_from=4khot_b&isplayer=1&ehps=1&clienttype=1&app_id=250528&web=1&channel=dubox&timestamp=${Date.now()}`,{
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Origin': 'https://layarkaca.id',
        'Referer': 'https://layarkaca.id/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'TE': 'trailers'
    }
})
let raw = await data.text()
const proxyBase = "https://profesor-api.vercel.app/api/proxy/video?url=";
    
    // Regex untuk mencari link http dan membungkusnya dengan proxy
    raw = raw.replace(/(https?:\/\/data\.terabox\.com[^\s]+)/g, (match) => {
        return `${proxyBase}${encodeURIComponent(match)}`;
    });

return raw
    
}

export async function getSearch(query,page=1) {
const data = await fetch(`https://api.ytbvideoly.com/api/resconsume/search?res_type=0&page=${page}&count=12&content=${query}&lang=ID&from_channel=11&hot_order_type=plays_pv&source_domain=layarkaca.id`,{
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Origin': 'https://layarkaca.id',
        'Referer': 'https://layarkaca.id/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'TE': 'trailers'
    }
})
const json = await data.json()
return json

}
