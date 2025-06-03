import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.htm'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.htm'));
});

export default router; 