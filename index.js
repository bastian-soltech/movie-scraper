import express from 'express'
import axios from 'axios';
import cors from 'cors'
import { GetDetailMovie,GetStreamMovie,GetHotMovie, getSearch } from './src/scrape/hotMovie.js';

const app = express();
const PORT = 5000;


app.use(cors());


app.get('/api/hot-movies', async (req, res) => {
    try {
        const response = await GetHotMovie()
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/search', async (req, res) => {
    try {
        const {query,page} = req.query
        const response = await getSearch(query,page)
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/detail/:enid', async (req, res) => {
    const enid = req.params.enid
    try {
        const movieDetail = await GetDetailMovie(enid)
        res.json(movieDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/stream', async (req, res) => {
    try {
        const { uk, shareid, fid } = req.query;
        
        if (!uk || !shareid || !fid) {
            return res.status(400).send("Parameter uk, shareid, dan fid wajib ada!");
        }

        const streamText = await GetStreamMovie(uk, shareid, fid);
        
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(streamText);
    } catch (error) {
        console.error("DETAIL ERROR:", error);
        res.status(500).send("Gagal generate playlist: " + error.message);
    }
});
app.get('/api/proxy-video', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream',
            timeout: 10000, 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Referer': 'https://www.4khotvideo.com/',
                'Range': req.headers.range // TERUSKAN Range Header untuk seeking lebih cepat
            }
        });

        res.status(response.status);
        res.set(response.headers);
        
        response.data.pipe(res);

    } catch (error) {
        if (!res.headersSent) res.status(500).send("Proxy Error");
    }
});
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});