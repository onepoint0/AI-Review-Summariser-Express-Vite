import axios from 'axios';

type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

export type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

export type SummariseRespose = {
    summary: string;
};

export const reviewApi = {
    fetchReviews(productId: number) {
        console.log('[Fetch Reviews ] in fetch');
        return axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`).then((res) => res.data);
    },
    summariseReviews(productId: number) {
        console.log('[Summarise Reviews ] summarise clicked');
        return axios.post<SummariseRespose>(`/api/products/${productId}/reviews/summarise`).then((res) => res.data);
    },
};
