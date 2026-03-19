const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Izinkan frontend kamu mengakses API ini
app.use(cors());

// Header standar yang dibutuhkan oleh API ytbvideoly
const commonHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Origin': 'https://www.4khotvideo.com',
    'Referer': 'https://www.4khotvideo.com/',
    'Accept': 'application/json, text/plain, */*'
};

// 1. Endpoint untuk List Film (Hot List)
app.get('/api/hot-movies', async (req, res) => {
    try {
        const response = await axios.get('https://api.ytbvideoly.com/api/resconsume/hotlist', {
            params: {
                res_type: 1,
                page: 1,
                count: 10,
                lang: 'PH',
                from_channel: 11,
                hot_order_type: 'plays_pv',
                source_domain: 'www.4khotvideo.com'
            },
            headers: commonHeaders
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Endpoint untuk Detail Film
app.get('/api/detail/:enid', async (req, res) => {
    try {
        const response = await axios.get('https://api.ytbvideoly.com/api/resconsume/detail', {
            params: {
                enid: req.params.enid,
                lang: 'PH',
                from_channel: 11,
                source_domain: 'www.4khotvideo.com'
            },
            headers: commonHeaders
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Endpoint untuk Stream (M3U8)
app.get('/api/stream', async (req, res) => {
    try {
        // Ambil parameter dari query frontend
        // const { uk, shareid, fid, sign } = req.query;
        
        const response = await axios.get('https://api.ytbvideoly.com/share/streaming?uk=4401094508863&shareid=35951197330&sign=9d06150a741b16b2da92bf646e749b263222af63&jsToken=ewre&type=M3U8_FLV_264_480&fid=162345422849116&esl=1&play_from=4khot_b&isplayer=1&ehps=1&clienttype=1&app_id=250528&web=1&channel=dubox&timestamp=17737543989894342', {
            headers: commonHeaders
        });
        
        // Kirim teks M3U8-nya
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// server.js (Lanjutan dari kode sebelumnya)

// Endpoint Pro
app.get('/api/proxy-video', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        console.log("Streaming segment...");

        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream', // UBAH KE STREAM
            headers: {
                'User-Agent': 'Mozilla/5.0...',
                'Referer': 'https://www.4khotvideo.com/',
                'Origin': 'https://www.4khotvideo.com'
            }
        });

        // Teruskan header asli dari TeraBox (penting untuk seeking)
        res.set('Content-Type', 'video/mp2t');
        
        // Alirkan data langsung (piping)
        response.data.pipe(res);

    } catch (error) {
        res.status(500).send("Proxy Error");
    }
});
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});