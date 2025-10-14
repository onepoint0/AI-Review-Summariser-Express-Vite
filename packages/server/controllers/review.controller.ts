import productRepository from '../repositories/product.repository';
import reviewRepository from '../repositories/review.repository';
import reviewService from '../services/review.service';
import type { Request, Response } from 'express';

const reviewController = {
    async getReviews(req: Request, res: Response) {
        console.log('[Review Controller - getReviews]');

        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }

        const product = await productRepository.getProduct(productId);

        if (!product) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }

        const reviews = await reviewService.getReviews(productId);

        return res.json(reviews);
    },
    async summariseReviews(req: Request, res: Response) {
        console.log('[Review Controller - summarise]');
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }

        const product = await productRepository.getProduct(productId);

        if (!product) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }

        const existingReviews = await reviewRepository.getReviews(productId, 1);

        if (existingReviews.length === 0) {
            res.status(400).json({ error: 'There are no reviews for this product.' });
            return;
        }

        const summary = await reviewService.summariseReviews(productId);
        // console.log(`[Review controller sumariseReviews] - summary = ${summary}`);
        return res.json({ summary });
    },
};
export default reviewController;
