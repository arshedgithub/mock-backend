export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    stock: number;
    images?: string[];
    specifications?: Record<string, string>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}