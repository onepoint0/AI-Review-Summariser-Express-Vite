import productRepository from '../repositories/product.repository';

export const productService = {
    getProducts: async () => {
        const products = await productRepository.getProducts();
        console.log('[ProductService - getProducts ] products = ', products);
        return products;
    },
};
