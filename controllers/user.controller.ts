import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import path from 'path';

export class UserController {
    public getUploadForm = (req: Request, res: Response): void => {
        res.sendFile(path.join(__dirname, '..', 'views', 'user_upload_form.htm'));
    };

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { user_id, name, email } = req.body;

            if (!user_id || !name || !email) {
                res.status(400).json({
                    success: false,
                    message: 'User ID, name, and email are required'
                });
                return;
            }

            console.log("creating User");
            

            res.status(201).json({
                success: true,
                message: 'User added successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error adding user',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Dias" },
                { id: 3, name: "Viky" }
            ];

            if (users && users.length > 0) {
                res.status(200).json({
                    success: true,
                    data: users
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No users found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving users',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
} 