import { PrismaClient, type Review } from '../generated/prisma';

const reviewRepository = {
    getReviews(productId: number, limit?: number): Promise<Review[]> {
        console.log(`[Review Repository - getReviews] getting reviews for product id ${productId} with limit ${limit}`);

        const prisma = new PrismaClient();

        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },
};

export default reviewRepository;
