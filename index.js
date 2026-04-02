import express from 'express'
import axios from 'axios';
import cors from 'cors'
import { GetDetailMovie,GetStreamMovie,GetHotMovie, getSearch, getSeries } from './src/scrape/hotMovie.js';
import * as lk21 from './src/scrape/lk21.js';

const app = express();
const PORT = 5000;


app.use(cors());


app.get('/api/hot-movies/:type/:page', async (req, res) => {
    try {
        const type = req.params.type
        const page = req.params.page
        const response = await GetHotMovie(type,page)
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
app.get('/api/get-series', async (req, res) => {
    try {
        const { id } = req.query;
        
        if (!id) {
            return res.status(400).send("Parameter id wajib ada!");
        }

        const series = await getSeries(id);
        res.json(series)
    } catch (error) {
        console.error("DETAIL ERROR:", error);
        res.status(500).send("Gagal mengambil series: " + error.message);
    }
});

// V1 API for LK21 (layarkaca.id)
app.get('/v1/api/hot-movies/:type/:page', async (req, res) => {
    try {
        const type = req.params.type
        const page = req.params.page
        const response = await lk21.GetHotMovie(type,page)
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/v1/api/search', async (req, res) => {
    try {
        const {query,page} = req.query
        const response = await lk21.getSearch(query,page)
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/v1/api/detail/:enid', async (req, res) => {
    const enid = req.params.enid
    try {
        const movieDetail = await lk21.GetDetailMovie(enid)
        res.json(movieDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/v1/api/stream', async (req, res) => {
    try {
        const { uk, shareid, fid } = req.query;
        
        if (!uk || !shareid || !fid) {
            return res.status(400).send("Parameter uk, shareid, dan fid wajib ada!");
        }

        const streamText = await lk21.GetStreamMovie(uk, shareid, fid);
        
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(streamText);
    } catch (error) {
        console.error("DETAIL ERROR:", error);
        res.status(500).send("Gagal generate playlist: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});