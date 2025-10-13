import type { Review } from '../generated/prisma';
import reviewRepository from '../repositories/review.repository';
import { llmClient } from '../llm/client';

const reviewService = {
    getReviews(productId: number): Promise<Review[]> {
        console.log('[Review Service - getReviews]');

        return reviewRepository.getReviews(productId);
    },
    async summariseReviews(productId: number): Promise<string> {
        const reviews = await reviewRepository.getReviews(productId, 5);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        const prompt = `Summarise the following customer reviews into a short paragraph, highlighting key themes both positive and negative ${joinedReviews}`;

        return llmClient.generateText({ prompt });
    },
};

export default reviewService;
