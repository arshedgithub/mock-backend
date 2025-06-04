import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { SetRoutes } from '../routes';
import { AppConfig } from '../config';
import { MongooseLoader } from './';

export class ExpressLoader {
    private readonly app: Application;
    private readonly mongooseLoader: MongooseLoader;

    constructor(app: Application) {
        this.app = app;
        this.mongooseLoader = MongooseLoader.getInstance();
    }

    private loadMiddleware(): void {
        // Security middleware
        this.app.use(helmet());
        this.app.use(cors({
            origin: AppConfig.APP_ALLOWED_ORIGINS,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Body parsing middleware
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        // Compression middleware
        this.app.use(compression());

        // Logging middleware
        if (process.env.NODE_ENV !== 'test') {
            this.app.use(morgan('dev'));
        }

        // Request logging
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });
    }

    private loadErrorHandlers(): void {
        // 404 handler
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                status: 'error',
                message: 'Route not found'
            });
        });

        // Error handler
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({
                status: 'error',
                message: process.env.NODE_ENV === 'production' 
                    ? 'Internal server error' 
                    : err.message
            });
        });
    }

    private async loadDatabase(): Promise<void> {
        try {
            await this.mongooseLoader.connect();
            console.log('Database connection established');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    }

    private loadRoutes(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                status: 'success',
                message: 'Server is healthy',
                timestamp: new Date().toISOString()
            });
        });

        SetRoutes(this.app);
    }

    public async load(): Promise<void> {
        try {
            // Load middleware first
            this.loadMiddleware();

            // Connect to database
            await this.loadDatabase();

            // Load routes
            this.loadRoutes();

            // Load error handlers last
            this.loadErrorHandlers();

            console.log('Express application loaded successfully');
        } catch (error) {
            console.error('Failed to load Express application:', error);
            process.exit(1);
        }
    }
}
