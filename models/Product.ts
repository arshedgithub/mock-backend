import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Product {
    static async create(data: {
        name: string;
        description: string;
        price: number;
        categoryId: string;
        stock?: number;
        images?: string[];
        specifications?: Record<string, any>;
        isActive?: boolean;
        isTemporary?: boolean;
    }) {
        return prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId,
                stock: data.stock ?? 0,
                images: data.images ?? [],
                specifications: data.specifications ?? {},
                isActive: data.isActive ?? true,
                isTemporary: data.isTemporary ?? true
            },
            include: { category: true }
        });
    }

    static async findById(id: string) {
        return prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });
    }

    static async findAll() {
        return prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async findByCategory(categoryId: string) {
        return prisma.product.findMany({
            where: { categoryId },
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async update(id: string, data: {
        name?: string;
        description?: string;
        price?: number;
        categoryId?: string;
        stock?: number;
        images?: string[];
        specifications?: Record<string, any>;
        isActive?: boolean;
    }) {
        return prisma.product.update({
            where: { id },
            data,
            include: { category: true }
        });
    }

    static async delete(id: string) {
        return prisma.product.delete({
            where: { id }
        });
    }
} 