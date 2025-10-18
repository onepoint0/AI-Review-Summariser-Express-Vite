import { productService } from '../services/product.service';
import type { Request, Response } from 'express';

const productController = {
    getProducts: async (req: Request, res: Response) => {
        const products = await productService.getProducts();
        res.status(200).json(products);
    },
};
export default productController;
