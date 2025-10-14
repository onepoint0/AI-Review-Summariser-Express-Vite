import dayjs from 'dayjs';
import { PrismaClient, type Review, type Summary } from '../generated/prisma';

const prisma = new PrismaClient();

const reviewRepository = {
    getReviews(productId: number, limit?: number): Promise<Review[]> {
        console.log(`[Review Repository - getReviews] getting reviews for product id ${productId} with limit ${limit}`);

        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },
    async getReviewSummary(productId: number): Promise<string | null> {
        const summary = await prisma.summary.findFirst({
            where: {
                AND: [{ productId }, { expiresAt: { gt: new Date() } }],
            },
        });

        return summary?.content ?? null;
    },
    storeReviewSummary(productId: number, summary: string) {
        console.log('[Review Repository - storeReviewSummary] - creating summary');
        const now = new Date();
        const expiresAt = dayjs().add(7, 'days').toDate();

        const data = {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
        };

        return prisma.summary.upsert({
            where: { productId },
            create: data,
            update: data,
        });
    },
};

export default reviewRepository;
