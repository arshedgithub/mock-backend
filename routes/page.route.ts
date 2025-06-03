import { Router } from "express";
import path from 'path';

export default class PageRoutes {
    constructor(private router: Router) {
        this.configureRoutes();
    }

    private configureRoutes() {
        // Home page
        this.router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'views', 'home.htm'));
        });

        // About page
        this.router.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'views', 'about.htm'));
        });
    }
} 