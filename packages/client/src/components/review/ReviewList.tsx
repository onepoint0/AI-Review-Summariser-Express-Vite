import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import { reviewApi, type GetReviewsResponse, type SummariseRespose } from './ReviewAPI';

type Props = {
    productId: number;
};

const ReviewList = ({ productId }: Props) => {
    const summaryMutation = useMutation<SummariseRespose>({
        mutationFn: () => reviewApi.summariseReviews(productId),
    });

    const reviewQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => reviewApi.fetchReviews(productId),
    }); // don't need useEffect for this bc it is running, caching, retrying etc in the query hook :D

    if (reviewQuery.isLoading) {
        console.log('is loading');
        return (
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((s) => (
                    <ReviewSkeleton key={s} />
                ))}
            </div>
        );
    }

    if (reviewQuery.isError) {
        return <p className="text-red-500">Could not fetch reveiws, please try again.</p>;
    }

    const summary = reviewQuery.data?.summary || summaryMutation.data?.summary;

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
                        onClick={() => summaryMutation.mutate()}
                        disabled={summaryMutation.isPending}
                    >
                        <HiSparkles /> Summarise Reviews
                    </Button>
                    {summaryMutation.isPending && (
                        <div className="py-2">
                            <ReviewSkeleton />
                        </div>
                    )}
                    {summaryMutation.isError && (
                        <p className="text-red-500 py-2">Could not summarise reviews, please try again later!</p>
                    )}
                </div>
            )}
            {reviewQuery.data?.reviews &&
                reviewQuery.data.reviews.map((r) => (
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
