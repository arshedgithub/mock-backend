import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Category {
    static async create(data: { name: string; description?: string }) {
        return prisma.category.create({
            data: {
                name: data.name,
                description: data.description
            }
        });
    }

    static async findById(id: string) {
        return prisma.category.findUnique({
            where: { id },
            include: { products: true }
        });
    }

    static async findAll() {
        return prisma.category.findMany({
            include: { products: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    static async update(id: string, data: { name?: string; description?: string }) {
        return prisma.category.update({
            where: { id },
            data,
            include: { products: true }
        });
    }

    static async delete(id: string) {
        return prisma.category.delete({
            where: { id }
        });
    }
} 