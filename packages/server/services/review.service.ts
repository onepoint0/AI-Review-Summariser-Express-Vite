import type { Review } from '../generated/prisma';
import reviewRepository from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarise-reviews.txt';

type ReviewData = {
    reviews: Review[];
    summary: string | null;
};

const reviewService = {
    async getReviews(productId: number): Promise<ReviewData> {
        console.log('[Review Service - getReviews]');

        const reviews = await reviewRepository.getReviews(productId);

        const summary = await reviewRepository.getReviewSummary(productId);

        return {
            reviews,
            summary: summary,
        };
    },
    async summariseReviews(productId: number): Promise<string> {
        const existingSummary = await reviewRepository.getReviewSummary(productId);

        if (existingSummary) {
            console.log('[Review Service] - got existing summary, returning...');
            return existingSummary;
        }

        const reviews = await reviewRepository.getReviews(productId, 5);
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        const prompt = template.replace('{{reviews}}', joinedReviews);

        const summary = await llmClient.generateText({ prompt });

        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};

export default reviewService;
