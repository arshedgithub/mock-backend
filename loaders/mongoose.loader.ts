import mongoose, { Mongoose, ConnectOptions } from 'mongoose';
import { mongooseConfig } from '../config';

export class MongooseLoader {
    private static instance: MongooseLoader | null = null;
    private client: Mongoose;
    private isConnected: boolean = false;
    private connectionAttempts: number = 0;
    private readonly maxRetries: number = 3;
    private readonly retryDelay: number = 5000;

    private constructor() {
        this.client = mongoose;
        this.setupEventListeners();
    }

    public static getInstance(): MongooseLoader {
        if (!MongooseLoader.instance) {
            MongooseLoader.instance = new MongooseLoader();
        }
        return MongooseLoader.instance;
    }

    private setupEventListeners(): void {
        this.client.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
            this.isConnected = true;
            this.connectionAttempts = 0;
        });

        this.client.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            this.isConnected = false;
            this.handleConnectionError();
        });

        this.client.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            this.isConnected = false;
            this.handleConnectionError();
        });

        process.on('SIGINT', this.gracefulShutdown.bind(this));
        process.on('SIGTERM', this.gracefulShutdown.bind(this));
    }

    private async handleConnectionError(): Promise<void> {
        if (this.connectionAttempts < this.maxRetries) {
            this.connectionAttempts++;
            console.log(`Retrying connection (${this.connectionAttempts}/${this.maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));
            await this.connect();
        } else {
            console.error('Max connection retries reached. Please check your MongoDB connection.');
            process.exit(1);
        }
    }

    private async gracefulShutdown(): Promise<void> {
        try {
            await this.client.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        } catch (err) {
            console.error('Error during MongoDB graceful shutdown:', err);
            process.exit(1);
        }
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log('MongoDB is already connected');
            return;
        }

        try {
            await this.client.connect(mongooseConfig.url, mongooseConfig.options as ConnectOptions);
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw new Error('Database connection failed');
        }
    }

    public getMongooseClient(): Mongoose {
        if (!this.isConnected) {
            throw new Error('MongoDB is not connected');
        }
        return this.client;
    }

    public isDatabaseConnected(): boolean {
        return this.isConnected;
    }

    public async ping(): Promise<boolean> {
        try {
            const admin = this.client.connection.db?.admin();
            if (!admin) {
                throw new Error('Database admin not available');
            }
            await admin.ping();
            return true;
        } catch (error) {
            console.error('Database ping failed:', error);
            return false;
        }
    }
}
