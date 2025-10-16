import axios from 'axios';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import { useState } from 'react';
import ReviewSkeleton from './ReviewSkeleton';

type Props = {
    productId: number;
};

type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

type SummariseRespose = {
    summary: string;
};

const ReviewList = ({ productId }: Props) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState('');

    const {
        data: reviewData,
        isLoading,
        error,
    } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    }); // don't need useEffect for this bc it is running, caching, retrying etc in the query hook :D

    const fetchReviews = async () => {
        console.log('in fetch');
        const { data } = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        console.log('review data = ', data);
        setSummary(data?.summary);
        console.log('summary set to ', summary);
        return data;
    };

    const handleSummarisation = async () => {
        try {
            setSummaryError('');
            setIsSummaryLoading(true);
            console.log('summarise clicked');
            const { data } = await axios.post<SummariseRespose>(`/api/products/${productId}/reviews/summarise`);
            setSummary(data?.summary);
        } catch (e) {
            console.error('[Review List ] error on get summary ', e);
            setSummaryError('Error getting summary, please try again later!');
        } finally {
            setIsSummaryLoading(false);
        }
    };

    if (isLoading) {
        console.log('is loading');
        return (
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((s) => (
                    <ReviewSkeleton key={s} />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">Could not fetch reveiws, please try again.</p>;
    }

    return (
        <div className="flex flex-col gap-5">
            {summary ? (
                <div className="flex flex-col gap-2 p-4 border-2 rounded-2xl mb-2">
                    <h4 className="font-bold">Reviews Summary</h4>
                    <div>{summary}</div>
                </div>
            ) : (
                <div>
                    <Button
                        className="background-black cursor-pointer"
                        onClick={handleSummarisation}
                        disabled={isSummaryLoading}
                    >
                        <HiSparkles /> Summarise Reviews
                    </Button>
                    {isSummaryLoading && (
                        <div className="py-2">
                            <ReviewSkeleton />
                        </div>
                    )}
                    {summaryError && <p className="text-red-500 py-2">{summaryError}</p>}
                </div>
            )}
            {reviewData?.reviews &&
                reviewData.reviews.map((r) => (
                    <div key={r.id}>
                        <div className="font-bold">{r.author}</div>
                        <StarRating value={r.rating} />
                        <p className="py-2">{r.content}</p>
                    </div>
                ))}
        </div>
    );
};

export default ReviewList;
