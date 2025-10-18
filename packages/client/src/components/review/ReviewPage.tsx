import ProductPicker from '../product/ProductPicker';
import ReviewList from './ReviewList';
import { useState } from 'react';

export const ReviewPage = () => {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    return (
        <>
            <ProductPicker onProductSelect={setSelectedProductId} />
            {selectedProductId && <ReviewList productId={selectedProductId} />}
        </>
    );
};
