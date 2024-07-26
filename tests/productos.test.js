import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';

    vi.mock('axios');

    describe('Get Products', () => {
        const mockData = {
            productos: [
                {
                    id: 6,
                    descripcion: "Descripcion producto",
                    precio: "20",
                    um: "Kg",
                    categoria_id: 2,
                    categoria_desc: "Categoría-sample-1",
                    created_at: "Jul 31, 2023"
                }
            ],
            message: "Retrieved Successfully"
        };

        beforeEach(() => {
            axios.get.mockResolvedValue({ data: mockData });
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should retrieve products successfully', async () => {
            const result = await axios.get('producto')
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockData);
        });
    });

    describe('Get Product', () => {
        const mockData = {
            productos: [
                {
                    id: 6,
                    descripcion: "Descripcion producto",
                    precio: "20",
                    um: "Kg",
                    categoria_id: 2,
                    categoria_desc: "Categoría-sample-1",
                    created_at: "Jul 31, 2023"
                }
            ],
            message: "Retrieved Successfully"
        };

        beforeEach(() => {
            axios.get.mockResolvedValue({ data: mockData });
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should retrieve one category successfully', async () => {
            const result = await axios.get('producto/6')
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockData);
        });
    });


    describe('Create Product', () => {
        const newProduct = {
            descripcion: "Descripcion producto",
            precio: "20",
            um: "Kg",
            categoria_id: 2,
            categoria_desc: "Categoría-sample-1",
            created_at: "Jul 31, 2023"
          };
          const mockResponse = {
            producto: {
              id: 8,
              ...newProduct
            },
            message: "Created Successfully"
          };

        beforeEach(() => {
            axios.post.mockResolvedValue({ data: mockResponse });
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should retrieve one category successfully', async () => {
            const result = await axios.post('producto')
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockResponse);
        });
    });

    describe('Update Product', () => {
            const updatedProduct = {
                id: 8,
                descripcion: "Updated product",
                precio: "20",
                um: "Kg",
                categoria_id: 2,
                categoria_desc: "Categoría-sample-1",
                created_at: "Jul 31, 2023"
            };
        
            const mockResponse = {
                categoria: updatedProduct,
                message: "Retrieved Successfully"
            };

        beforeEach(() => {
            axios.put.mockResolvedValue({ data: mockResponse });
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should retrieve one category successfully', async () => {
            const result = await axios.put('producto/' + 8, "Updated Product")
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockResponse);
        });
    });

    describe('Delete Product', () => {
        const productId = 6;

        const mockResponse = {
          message: "Deleted Successfully"
        };

    beforeEach(() => {
        axios.delete.mockResolvedValue({ data: mockResponse });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should retrieve one category successfully', async () => {
        const result = await axios.delete('producto/' + productId)
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(result['data']).toEqual(mockResponse);
    });
});
