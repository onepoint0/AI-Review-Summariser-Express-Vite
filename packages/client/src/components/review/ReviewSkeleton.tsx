import Skeleton from 'react-loading-skeleton';

function ReviewSkeleton() {
    return (
        <>
            <Skeleton width={150} />
            <Skeleton width={100} />
            <Skeleton count={2} />
        </>
    );
}

export default ReviewSkeleton;
