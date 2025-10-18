import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { useEffect, useState } from 'react';

type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
};

type Props = {
    onProductSelect: (productId: number) => void;
};

const ProductPicker = ({ onProductSelect }: Props) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        const getProducts = async () => {
            const products = await axios.get<ProductType[]>('/api/products');
            setProducts(products.data);
        };
        getProducts();
    }, []);
    return (
        <div className="flex gap-3 my-4">
            <Select onValueChange={(val) => onProductSelect(Number(val))}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={<span className="font-bold">Select Product</span>} />
                </SelectTrigger>
                <SelectContent>
                    {products &&
                        products.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                                {p.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProductPicker;
