import express, { Application } from 'express';
import { config } from 'dotenv';
import { ExpressLoader, MongooseLoader } from '../loaders';
import { AppConfig } from '../config';

config();

class Server {
    private app: Application;
    private expressLoader: ExpressLoader;
    private mongooseLoader: MongooseLoader;

    constructor() {
        this.app = express();
        this.expressLoader = new ExpressLoader(this.app);
        this.mongooseLoader = MongooseLoader.getInstance();
    }

    private async start(): Promise<void> {
        try {
            await this.mongooseLoader.connect();
            await this.expressLoader.load();

            this.app.listen(AppConfig.PORT, () => {
                console.log(`
                🚀 Server is running!
                📡 Port: ${AppConfig.PORT}
                🌍 Environment: ${process.env.NODE_ENV || 'development'}
                ⏰ Time: ${new Date().toLocaleString()}
                `);
            });

            // Handle uncaught exceptions
            process.on('uncaughtException', (error: Error) => {
                console.error('Uncaught Exception:', error);
                process.exit(1);
            });

            // Handle unhandled promise rejections
            process.on('unhandledRejection', (reason: any) => {
                console.error('Unhandled Rejection:', reason);
                process.exit(1);
            });

        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    public static async bootstrap(): Promise<void> {
        const server = new Server();
        await server.start();
    }
}

// Start the server
Server.bootstrap().catch(error => {
    console.error('Failed to bootstrap server:', error);
    process.exit(1);
});
