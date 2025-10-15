import { FaRegStar, FaStar } from 'react-icons/fa';

type Props = {
    value: number;
};

const StarRating = ({ value }: Props) => {
    const placeholders = [1, 2, 3, 4, 5];
    return (
        <div className="flex gap-2 text-yellow-500">
            {placeholders.map((p) => (value > p ? <FaStar key={p} /> : <FaRegStar key={p} />))}
        </div>
    );
};

export default StarRating;
