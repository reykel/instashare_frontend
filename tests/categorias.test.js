import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';

    vi.mock('axios');

    describe('Get Categories', () => {
        const mockData = {
            categorias: [
                {
                    id: 2,
                    descripcion: "Categoría-sample-1",
                    created_at: "Jul 31, 2023"
                },
                {
                    id: 3,
                    descripcion: "Categoría-sample-2",
                    created_at: "Jul 19, 2024"
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

        it('should retrieve categories successfully', async () => {
            const result = await axios.get('categorias')
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockData);
        });
    });

    describe('Get Category', () => {
        const mockData = {
            categoria: [
                {
                    id: 2,
                    descripcion: "Categoría-sample-1",
                    created_at: "Jul 31, 2023"
                },
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
            const result = await axios.get('categoria/2')
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockData);
        });
    });

    describe('Create Category', () => {
        const newCategory = {
            descripcion: "New Category",
            created_at: "Jul 24, 2024"
          };
          const mockResponse = {
            categoria: {
              id: 4,
              ...newCategory
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
            const result = await axios.post('categorias')
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockResponse);
        });
    });

    describe('Update Category', () => {
            const updatedCategory = {
                id: 2,
                descripcion: "Updated Category",
                created_at: "Jul 31, 2023"
            };
        
            const mockResponse = {
                categoria: updatedCategory,
                message: "Retrieved Successfully"
            };

        beforeEach(() => {
            axios.put.mockResolvedValue({ data: mockResponse });
        });

        afterEach(() => {
            vi.resetAllMocks();
        });

        it('should retrieve one category successfully', async () => {
            const result = await axios.put('categorias/' + 2, "Updated Category")
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(result['data']).toEqual(mockResponse);
        });
    });

    describe('Delete Category', () => {
        const categoryId = 2;

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
        const result = await axios.delete('categoria/' + categoryId)
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(result['data']).toEqual(mockResponse);
    });
});
