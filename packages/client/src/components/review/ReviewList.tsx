import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';

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

const ReviewList = ({ productId }: Props) => {
    const [reviewData, setReviewData] = useState<GetReviewsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const fetchReviews = async () => {
        console.log('in fetch');
        setIsLoading(true);
        const { data } = await axios.get<GetReviewsResponse>(`/api/products/${productId}/reviews`);
        setReviewData(data);
        console.log('review data = ', data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (isLoading) {
        console.log('is loading');
        return (
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((s) => (
                    <div key={s}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton count={2} />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-5">
            {reviewData &&
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
