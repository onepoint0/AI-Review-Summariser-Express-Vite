import express from 'express';
import type { Request, Response } from 'express';
import reviewService from './services/review.service';
import reviewController from './controllers/review.controller';

const router = express.Router();

// this should not show route handlers, they should just be references to functions
router.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'hello!' });
});

router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post('/api/products/:id/reviews/summarise', reviewController.summariseReviews);

export default router;
