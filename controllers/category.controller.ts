import { Request, Response } from 'express';

export class CategoryController {
    public getCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = [
                { id: 1, name: 'Electronics' },
                { id: 2, name: 'Clothing' }
            ];
            
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching categories',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    public createCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.body;
            
            if (!name) {
                res.status(400).json({
                    success: false,
                    message: 'Category name is required'
                });
                return;
            }

            const newCategory = {
                id: Date.now(),
                name
            };

            res.status(201).json({
                success: true,
                data: newCategory
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating category',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
} 