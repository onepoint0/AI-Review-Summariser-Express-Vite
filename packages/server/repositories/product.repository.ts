import { PrismaClient, type Product } from '../generated/prisma';

const prisma = new PrismaClient();

const productRepository = {
    getProduct(productId: number): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id: productId },
        });
    },
    getProducts(): Promise<Product[]> {
        return prisma.product.findMany();
    },
};
export default productRepository;
